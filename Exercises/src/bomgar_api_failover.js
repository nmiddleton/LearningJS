/**
 * Created by U8013621 on 16/10/2014.
 */
var parseString = require('xml2js').parseString,
    q = require('q'),
    util = require('util'),
    dns = require('dns'),
    _ = require('lodash');
https = require('https');
var options = {
    port: 443,
    path: '/api/command?username=api&password=Dj8uC2Kcu6Zbr86!&action=',
    method: 'GET'
};

var DTC = {
    dns: 'LON-ECOM-BGMN01.rs.cp.thomsonreuters.com',
    vip: '159.220.24.73',
    isFailoverRole: ''
};
var HZL = {
    dns: 'HZL-ECOM-BGMN01.rs.cp.thomsonreuters.com',
    vip: '159.220.50.16',
    isHealthy: 0,
    isFailoverRole: ''
};
var SVC = {
    dns: 'rs.cp.thomsonreuters.com',
    vip: '',
    isHealthy: 0,
    isFailoverRole: ''
};
var apiActions = {
    isHealthy: options.path + 'check_health',
    set_failover_primary: options.path + 'set_failover_role&role=primary',
    set_failover_backup: options.path + 'set_failover_role&role=backup'
};

var debugstr = 'DEBUG:\n';
function debugstream (debug){
    debugstr += '\n' + debug;
}
function apiCall(site, action) {
    var deferred = q.defer();
    options.path = action;
    options.host = site.dns;
    var req = https.request(options, function (res) {
        res.on('data', function (xml) {
            parseString(xml, function (err, result) {
                debugstream (util.inspect(result, false, null));

                // Action Check_health
                if (action === apiActions.isHealthy) {
                    site.isHealthy = result.health_check.success[0];
                    site.isFailoverRole = result.health_check.failover_role[0];
                    site.updated = 1;
                    console.log('SITE', result.health_check.appliance[0]._);
                    debugstream('Health' + site.isHealthy);
                    debugstream('ROLE' + site.isFailoverRole);
                }
                //Action set Primary
                if (action === apiActions.set_failover_primary){

                }
//                Action set Standby
                if (action === apiActions.set_failover_backup){
                   site.roleChanged=1;
                }
            });
//        process.stdout.write(xml);
        });
        deferred.resolve(site);
    });
    req.end();

    req.on('error', function (e) {
        console.error(e);
    });
    return deferred.promise
}

function updateSBY() {
    var deferred = q.defer();
    var statusSBY = apiCall(HZL,apiActions.isHealthy);
    deferred.resolve(statusSBY);
    return deferred.promise;
}
function updatePRI() {
    var deferred = q.defer();
    var statusPRI = apiCall(DTC, apiActions.isHealthy);
    deferred.resolve(statusPRI);
    return deferred.promise;
}
function updateSVC() {
    var deferred = q.defer();
    dns.resolve4(SVC.dns, function (err, addresses) {
        if (err) throw err;
       debugstream('addresses: ' + JSON.stringify(addresses[0]));
        SVC.vip = addresses[0];
    });
    var statusSVC = apiCall(SVC, apiActions.isHealthy);
    deferred.resolve(statusSVC);
    return deferred.promise;
}
function makePrimary(site) {
    var deferred = q.defer();
    console.log('makePrimary ' + site.dns + ' currently: '+ site.isFailoverRole );
    site = DTC;
    site.roleChanged =  apiCall(DTC, apiActions.set_failover_primary);
    deferred.resolve(site.roleChanged);
    return deferred.promise;
}
function makeBackup(site) {
    var deferred = q.defer();
    site=HZL;
    console.log('makeBackup ' + site.dns + ' currently: '+ site.isFailoverRole );

    site.roleChanged =  apiCall(HZL, apiActions.set_failover_backup);
    deferred.resolve(site.roleChanged);
    return deferred.promise;
}

function failoverIfRequired() {
    var deferred = q.defer();
    if (SVC.vip === DTC.vip && DTC.isHealthy && DTC.isFailoverRole === 'primary' && HZL.isFailoverRole === 'backup') {
        debugstream('ALL IS WELL!');
    } else {
        debugstream('Errrr!');
    }
    console.log('FPRI', DTC.updated, DTC.isHealthy, DTC.vip,DTC.isFailoverRole, DTC.dns);
    console.log('FSBY', HZL.updated, HZL.isHealthy, HZL.vip,HZL.isFailoverRole, HZL.dns);
    console.log('FSVC', SVC.updated, SVC.isHealthy, SVC.vip,SVC.isFailoverRole, SVC.dns);

    if (SVC.vip === HZL.vip && HZL.isFailoverRole === 'backup') {
        makePrimary(HZL);
    }
    if (SVC.vip === DTC.vip && DTC.isHealthy && HZL.isFailoverRole !== 'backup') {
        makePrimary(DTC);
        makeBackup(HZL);
    }
    console.log(debugstr);
    deferred.resolve(HZL.roleChanged);
    return deferred.promise;
}




q.try(updateSBY)
    .then(updatePRI)
    .then(updateSVC)
//    .then(makeBackup)
//    .then(makePrimary);
    .then(failoverIfRequired);


// Normal state (do nothing)
//	site	role			isUp		VIP
// rs		primary		true		159.220.24.73
//	DTC		primary		true		159.220.24.73
// HZL		backup		true		159.220.50.16

// At fail state (do nothing)
//	site	role			isUp	    VIP
// rs		primary		true		159.220.24.73
//	DTC		*-  		*false  	*-
// HZL		backup		true		159.220.50.16

// At DNS failed over state (make HZL Primary)
//	site	role			isUp	    VIP
// rs		*backup	        true	*159.220.50.16
//	DTC		-  				false	-
// HZL		backup		    true	159.220.50.16


//if ($SERVICE{curr_vip} eq $HZL{vip} && $HZL{isFailoverRole} eq 'backup'){
//	&makePrimary(\%HZL);
//}


// At service failed over state (do nothing)
//	site	role			isUp		VIP
// rs		*primary		true		159.220.50.16
//	DTC		-  					false		-
// HZL		*primary		true		159.220.50.16

// At preferred master restored state (do nothing)
//	site	role			isUp		VIP
// rs		primary		true		159.220.50.16
//	DTC		*anything	*true		*159.220.24.73
// HZL		primary		true		159.220.50.16

// At DNS failed back (make DTC Primary)
//	site	role			isUp		VIP
// rs		anything		true		*159.220.24.73
//	DTC		anything	true		159.220.24.73
// HZL		primary		true		159.220.50.16


//if ($SERVICE{vip} eq $DTC{vip} && $DTC{isHealthy} && $HZL{isFailoverRole} ne 'backup'){
//	&makePrimary(\%DTC);
//	&makebackup(\%HZL);
//}


// Normal state (do nothing)
//	site	role			isUp		VIP
// rs		primary		true		159.220.24.73
//	DTC		primary		true		159.220.24.73
// HZL		backup		true		159.220.50.16
