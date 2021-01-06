const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });
   
  readline.question('Nhap so can kiem tra: \n', number => {
    console.log(`${number}%3: `, number%3);
    readline.close();
  });