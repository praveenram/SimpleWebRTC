const browserify = require('browserify');
const fs = require('fs');
const request = require('request');
const uglify = require('uglify-js');

const bundle = browserify({ standalone: 'SimpleWebRTC' });
bundle.add('./src/simplewebrtc');
bundle.bundle(function (err, source) {
  if (err) {
    console.error(err);
  }
  fs.writeFileSync('out/simplewebrtc.bundle.js', source);
  fs.writeFile('out/latest-v2.js', uglify.minify(source.toString('utf8'), {fromString: true}).code, function (err) {
    if (err) throw err;
  });
  const adapter = fs.readFileSync('node_modules/webrtc-adapter/out/adapter.js').toString();
  fs.writeFileSync('out/simplewebrtc-with-adapter.bundle.js', `${adapter}\n${source}`);
});
