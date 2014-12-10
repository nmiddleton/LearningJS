/**
 * Created by u8013621 on 21/10/2014.
 */
var Http = require('http');
var Tls = require('tls');

var req = Http.request({
//    host: '192.168.5.8',
//    port: 3128,
    port: '8080',
    rejectUnauthorized: false,
    host: '10.23.28.130',
    method: 'CONNECT',
    path: 'rs.cp.thomsonreuters.com:443'
});

req.on('connect', function(res, socket, head)
{
    var cts = Tls.connect(
        {
            host: 'rs.cp.thomsonreuters.com',
            socket: socket
        },
        function()
        {
            cts.write('GET / HTTP/1.1\r\nHost: rs.cp.thomsonreuters.com\r\n\r\n');
        }
    );

    cts.on('data', function(data)
    {
        console.log(data.toString());
    });
});

req.end();