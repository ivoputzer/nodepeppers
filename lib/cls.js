require('child_process').exec('rm -f ./tmp/*', function(error, stdout, stderr){
  if (!error) console.log('+ Purged temporary files')
})