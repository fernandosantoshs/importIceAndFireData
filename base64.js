import base64 from 'base-64';

const imgbase64 = 'aHR0cHM6Ly9jb3ZlcnMub3BlbmxpYnJhcnkub3JnL2IvaXNibi85NzgtMDU1MzEwNjYzMy1MLmpwZw==';

let imgDecoded = base64.decode(imgbase64);

console.log(imgDecoded)