const scriptName = "주식 2";
var allsee = new Array(1000).join(String.fromCharCode(847));
const AD = ['주가가 올라갈수록 변동폭이 커집니다!', '환전기능이 생길꺼라는 소문이 있다던데?', '도움말은 "*주식봇 도움말" !', '주가옆에 [] 안에 있는 숫자는 변동폭이랍니다!'];
Z2ren = [-10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
/**
 * (string) room
 * (string) sender
 * (boolean) isGroupChat
 * (void) replier.reply(message)
 * (boolean) replier.reply(room, message, hideErrorToast = false) // 전송 성공시 true, 실패시 false 반환
 * (string) imageDB.getProfileBase64()
 * (string) packageName
 */

Z2R = setInterval(function() {
  for (let ii = 1; ii < 7; ii++) {
    RE1 = Z2ren[Math.floor(Math.random() * 21)];
    RP1 = Math.floor(DataBase.getDataBase('RP'+ii));
    RO1 = Math.floor(RE1 / 100 * RP1);
    DataBase.setDataBase('RO'+ii, RO1);
    DataBase.setDataBase('RP'+ii, RP1+RO1);
    if (RP1 < 10000) {
      DataBase.setDataBase('RP'+ii, 10000);
      DataBase.setDataBase('RO'+ii, 0);
    }
  }
}, 30000);

function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
  try {
    var joinbot  = DataBase.getDataBase('주식게임-2 가입리스트').split('\n');
  }catch (e) {
    var joinbot = [''];
  }
  try {
    var roomlist = DataBase.getDataBase('Z-roomlist').split('\n');
  }catch (e) {
    var roomlist = [''];
  }
  try {
    var blacklist = DataBase.getDataBase('blacklist').split('\n');
  }catch (e) {
    var blacklist = [''];
  }
  if (blacklist.includes(sender))
    return;
  var message = msg.split(' ');
  if (msg == '*가입') {
    if (joinbot.includes(sender)) {
      replier.reply('이미 가입 하셨습니다. 만약 가입하지 않으셨다면 다른 유저가 해당 닉네임을 사용하고 있을수 있습니다.');
    } else if (sender.includes('\n')||sender.includes('@')||sender.includes('\'')) {
      replier.reply('일부 특수문자가 포함된 닉네임은 가입이 불가능 합니다.');
    } else {
      DataBase.setDataBase('주식게임-2 가입리스트', DataBase.getDataBase('주식게임-2 가입리스트')+'\n'+sender);
      setting(sender);
      replier.reply('성공적으로 등록되었습니다. (도움말은 *주식봇 도움말)');
    }
  }
  if (message[0] == '*주식봇') {
    if (!joinbot.includes(sender)) {
      return;
    } else if (joinbot.includes(sender)) {
        switch(message[1]) {

          case '내정보' :
            if (message[2] == undefined) {
              show_important(sender, replier);
              break;
            }
          
          case '정보' :
            let username = msg.replace('*주식봇 정보 ', '');
            if (username.charAt(0) == '@')
              username = username.replace('@', '');
            if (!joinbot.includes(username)) {
              replier.reply('해당 유저의 정보를 찾지 못하였습니다.');
              return;
            } else if (joinbot.includes(username)) {
              show_important(username, replier);
              break;
            } else {
              return;
            }
          case '주가' :
            RP1 = DataBase.getDataBase('RP1');
            RP2 = DataBase.getDataBase('RP2');
            RP3 = DataBase.getDataBase('RP3');
            RP4 = DataBase.getDataBase('RP4');
            RP5 = DataBase.getDataBase('RP5');
            RP6 = DataBase.getDataBase('RP6');
            RO1 = DataBase.getDataBase('RO1');
            RO2 = DataBase.getDataBase('RO2');
            RO3 = DataBase.getDataBase('RO3');
            RO4 = DataBase.getDataBase('RO4');
            RO5 = DataBase.getDataBase('RO5');
            RO6 = DataBase.getDataBase('RO6');
            replier.reply('[ 주가 ]\nApple : '+RP1+' [ '+RO1+' ]'+'\n-------------\nSamsung : '+RP2+' [ '+RO2+' ]'+'\n-------------\nMicrosoft : '+RP3+' [ '+RO3+' ]'+'\n-------------\nIntel : '+RP4+' [ '+RO4+' ]'+'\n-------------\nNvidia : '+RP5+' [ '+RO5+' ]'+'\n-------------\nAmazon : '+RP6+' [ '+RO6+' ]');
            break;
          
          case '도움말' :
            let ad = AD[Math.floor(Math.random() * 4)]
            replier.reply('[ 주식봇 도움말 ]\n\n'+allsee+'*주식봇 [내정보 , 정보 (플레이어 이름), 주가, code]\n*주식봇 (주식 종류) (구매할 개수)\n*판매 (주식 종류) (판매할 개수)\n+[ AD ]\n'+ad);
            break;

          case 'code' :
            replier.reply('https://github.com/Tbot223/Z-BETA');
            break;

          default :
            replier.reply('해당 명령어는 존재하지 않습니다, 다시 입력해주세요.');
            break;
      }
    }
  }
  if (message[0] == '*구매') {
    if (!joinbot.includes(sender)) {
      return;
    } else if (joinbot.includes(sender)) {
        RP1 = Number(DataBase.getDataBase('RP1'));
        RP2 = Number(DataBase.getDataBase('RP2'));
        RP3 = Number(DataBase.getDataBase('RP3'));
        RP4 = Number(DataBase.getDataBase('RP4'));
        RP5 = Number(DataBase.getDataBase('RP5'));
        RP6 = Number(DataBase.getDataBase('RP6'));
        money = Number(DataBase.getDataBase('Z2 '+sender+' is money'));
        Apple = Number(DataBase.getDataBase('Z2 '+sender+' is Apple'));
        Samsung = Number(DataBase.getDataBase('Z2 '+sender+' is Samsung'));
        Microsoft = Number(DataBase.getDataBase('Z2 '+sender+' is Microsoft'));
        Intel = Number(DataBase.getDataBase('Z2 '+sender+' is Intel'));
        Nvidia = Number(DataBase.getDataBase('Z2 '+sender+' is Nvidia'));
        Amazon = Number(DataBase.getDataBase('Z2 '+sender+' is Amazon'));
        switch(message[1]) {

            case 'Apple' :
              cutting = Number(msg.replace('*구매 Apple ', ''));
              if (isNaN(Number(cutting))) {
                  replier.reply('숫자를 입력해주세요.');
                  return;
              } else if (money < Number(RP1*cutting)) {
                  replier.reply('돈이 부족합니다.');
                  return;
              } else if (Apple+cutting >= 500) {
                  replier.reply('500개 이상 보유 불가능합니다.');
                  return;
              } else if (cutting > 500) {
                  replier.reply('한번에 500개 까지만 살수 있습니다.');
                  return;
              } else if (money >= Number(RP1*cutting)) {
                  DataBase.setDataBase('Z2 '+sender+' is money', money-RP1*cutting);
                  DataBase.setDataBase('Z2 '+sender+' is Apple', Apple+cutting);
                  replier.reply('주식 "Apple"를 "'+cutting+'개 구매하셨습니다.\n(자세한 정보는 *주식봇 내정보)');
                  return;
              } else {
                  break;
              }
            
            case 'Samsung' :
              cutting = Number(msg.replace('*구매 Samsung ', ''));
              if (isNaN(Number(cutting))) {
                  replier.reply('숫자를 입력해주세요.');
                  return;
              } else if (money < Number(RP2*cutting)) {
                  replier.reply('돈이 부족합니다.');
                  return;
              } else if (Samsung+cutting >= 500) {
                  replier.reply('500개 이상 보유 불가능합니다.');
                  return;
              } else if (cutting > 500) {
                  replier.reply('한번에 500개 까지만 살수 있습니다.');
                  return;
              } else if (money >= Number(RP2*cutting)) {
                  DataBase.setDataBase('Z2 '+sender+' is money', money-RP2*cutting);
                  DataBase.setDataBase('Z2 '+sender+' is Samsung', Samsung+cutting);
                  replier.reply('주식 "Samsung"을 "'+cutting+'개 구매하셨습니다.\n(자세한 정보는 *주식봇 내정보)');
                  return;
              } else {
                  break;
              }

            case 'Microsoft' :
              cutting = Number(msg.replace('*구매 Microsoft ', ''));
              if (isNaN(Number(cutting))) {
                  replier.reply('숫자를 입력해주세요.');
                  return;
              } else if (money < Number(RP3*cutting)) {
                  replier.reply('돈이 부족합니다.');
                  return;
              } else if (Microsoft+cutting >= 500) {
                  replier.reply('500개 이상 보유 불가능합니다.');
                  return;
              } else if (cutting > 500) {
                replier.reply('한번에 500개 까지만 살수 있습니다.');
                return;
              } else if (money >= Number(RP3*cutting)) {
                  DataBase.setDataBase('Z2 '+sender+' is money', money-RP3*cutting);
                  DataBase.setDataBase('Z2 '+sender+' is Microsoft', Microsoft+cutting);
                  replier.reply('주식 "Microsoft"를 "'+cutting+'개 구매하셨습니다.\n(자세한 정보는 *주식봇 내정보)');
                  return;
              } else {
                  break;
              }

            case 'Intel' :
              cutting = Number(msg.replace('*구매 Intel ', ''));
              if (isNaN(Number(cutting))) {
                  replier.reply('숫자를 입력해주세요.');
                  return;
              } else if (money < Number(RP4*cutting)) {
                  replier.reply('돈이 부족합니다.');
                  return;
              } else if (Intel+cutting >= 500) {
                  replier.reply('500개 이상 보유 불가능합니다.');
                  return;
              } else if (cutting > 500) {
                  replier.reply('한번에 500개 까지만 살수 있습니다.');
                  return;
              } else if (money >= Number(RP4*cutting)) {
                  DataBase.setDataBase('Z2 '+sender+' is money', money-RP4*cutting);
                  DataBase.setDataBase('Z2 '+sender+' is Intel', Intel+cutting);
                  replier.reply('주식 "Intel"를 "'+cutting+'개 구매하셨습니다.\n(자세한 정보는 *주식봇 내정보)');
                  return;
              } else {
                  break;
              }

            case 'Nvidia' :
              cutting = Number(msg.replace('*구매 Nvidia ', ''));
              if (isNaN(Number(cutting))) {
                  replier.reply('숫자를 입력해주세요.');
                  return;
              } else if (money < Number(RP5*cutting)) {
                  replier.reply('돈이 부족합니다.');
                  return;
              } else if (Nvidia+cutting >= 500) {
                  replier.reply('500개 이상 보유 불가능합니다.');
                  return;
              } else if (cutting > 500) {
                  replier.reply('한번에 500개 까지만 살수 있습니다.');
                  return;
              } else if (money >= Number(RP5*cutting)) {
                  DataBase.setDataBase('Z2 '+sender+' is money', money-RP5*cutting);
                  DataBase.setDataBase('Z2 '+sender+' is Nvidia', Nvidia+cutting);
                  replier.reply('주식 "Nvidia"를 "'+cutting+'개 구매하셨습니다.\n(자세한 정보는 *주식봇 내정보)');
                  return;
              } else {
                  break;
              }

            case 'Amazon' :
              cutting = Number(msg.replace('*구매 Amazon ', ''));
              if (isNaN(Number(cutting))) {
                  replier.reply('숫자를 입력해주세요.');
                  return;
              } else if (money < Number(RP6*cutting)) {
                  replier.reply('돈이 부족합니다.');
                  return;
              } else if (Amazon+cutting >= 500) {
                  replier.reply('500개 이상 보유 불가능합니다.');
                  return;
              } else if (cutting > 500) {
                  replier.reply('한번에 500개 까지만 살수 있습니다.');
                  return;
              } else if (money >= Number(RP6*cutting)) {
                  DataBase.setDataBase('Z2 '+sender+' is money', money-RP6*cutting);
                  DataBase.setDataBase('Z2 '+sender+' is Nvidia', Amazon+cutting);
                  replier.reply('주식 "Amazon"를 "'+cutting+'개 구매하셨습니다.\n(자세한 정보는 *주식봇 내정보)');
                  return;
              } else {
                  break;
              }

            default :
              replier.reply('존재 하지않는 주식 이름입니다.');
              return;
        }
    }
  }
  if (message[0] == '*판매') {
    if (!joinbot.includes(sender)) {
      return;
    } else if (joinbot.includes(sender)) {
        RP1 = Number(DataBase.getDataBase('RP1'));
        RP2 = Number(DataBase.getDataBase('RP2'));
        RP3 = Number(DataBase.getDataBase('RP3'));
        RP4 = Number(DataBase.getDataBase('RP4'));
        RP5 = Number(DataBase.getDataBase('RP5'));
        RP6 = Number(DataBase.getDataBase('RP6'));
        money = Number(DataBase.getDataBase('Z2 '+sender+' is money'));
        Apple = Number(DataBase.getDataBase('Z2 '+sender+' is Apple'));
        Samsung = Number(DataBase.getDataBase('Z2 '+sender+' is Samsung'));
        Microsoft = Number(DataBase.getDataBase('Z2 '+sender+' is Microsoft'));
        Intel = Number(DataBase.getDataBase('Z2 '+sender+' is Intel'));
        Nvidia = Number(DataBase.getDataBase('Z2 '+sender+' is Nvidia'));
        Amazon = Number(DataBase.getDataBase('Z2 '+sender+' is Amazon'));
        switch(message[1]) {

            case 'Apple' :
              cutting = Number(msg.replace('*판매 Apple ', ''));
              if (isNaN(Number(cutting))) {
                  replier.reply('숫자를 입력해주세요.');
                  return;
              } else if (Apple < cutting) {
                  replier.reply('보유한 주식의 개수가 부족합니다.');
                  return;
              } else if (0 < Apple) {
                  DataBase.setDataBase('Z2 '+sender+' is money', money+RP1*cutting);
                  DataBase.setDataBase('Z2 '+sender+' is Apple', Apple-cutting);
                  replier.reply('주식 "Apple"를 "'+cutting+'개 판매하셨습니다.\n(자세한 정보는 *주식봇 내정보)');
                  return;
              } else {
                  break;
              }
            
            case 'Samsung' :
              cutting = Number(msg.replace('*판매 Samsung ', ''));
              if (isNaN(Number(cutting))) {
                  replier.reply('숫자를 입력해주세요.');
                  return;
              } else if (cutting > Samsung) {
                  replier.reply('보유한 주식의 개수가 부족합니다.');
                  return;
              } else if (0 < Samsung) {
                  DataBase.setDataBase('Z2 '+sender+' is money', money+RP2*cutting);
                  DataBase.setDataBase('Z2 '+sender+' is Samsung', Samsung-cutting);
                  replier.reply('주식 "Samsung"을 "'+cutting+'개 판매하셨습니다.\n(자세한 정보는 *주식봇 내정보)');
                  return;
              } else {
                  break;
              }

            case 'Microsoft' :
              cutting = Number(msg.replace('*판매 Microsoft ', ''));
              if (isNaN(Number(cutting))) {
                  replier.reply('숫자를 입력해주세요.');
                  return;
              } else if (cutting > Microsoft) {
                replier.reply('보유한 주식의 개수가 부족합니다.');
                return;
              } else if (0 < Microsoft) {
                  DataBase.setDataBase('Z2 '+sender+' is money', money+RP3*cutting);
                  DataBase.setDataBase('Z2 '+sender+' is Microsoft', Microsoft-cutting);
                  replier.reply('주식 "Microsoft"를 "'+cutting+'개 판매하셨습니다.\n(자세한 정보는 *주식봇 내정보)');
                  return;
              } else {
                  break;
              }

            case 'Intel' :
              cutting = Number(msg.replace('*판매 Intel ', ''));
              if (isNaN(Number(cutting))) {
                  replier.reply('숫자를 입력해주세요.');
                  return;
              } else if (cutting > 500) {
                  replier.reply('보유한 주식의 개수가 부족합니다.');
                  return;
              } else if (0 < Intel) {
                  DataBase.setDataBase('Z2 '+sender+' is money', money+RP4*cutting);
                  DataBase.setDataBase('Z2 '+sender+' is Intel', Intel-cutting);
                  replier.reply('주식 "Intel"를 "'+cutting+'개 판매하셨습니다.\n(자세한 정보는 *주식봇 내정보)');
                  return;
              } else {
                  break;
              }

            case 'Nvidia' :
              cutting = Number(msg.replace('*판매 Nvidia ', ''));
              if (isNaN(Number(cutting))) {
                  replier.reply('숫자를 입력해주세요.');
                  return;
              } else if (cutting > Nvidia) {
                  replier.reply('보유한 주식의 개수가 부족합니다.');
                  return;
              } else if (0 < Nvidia) {
                  DataBase.setDataBase('Z2 '+sender+' is money', money+RP5*cutting);
                  DataBase.setDataBase('Z2 '+sender+' is Nvidia', Nvidia-cutting);
                  replier.reply('주식 "Nvidia"를 "'+cutting+'개 판매하셨습니다.\n(자세한 정보는 *주식봇 내정보)');
                  return;
              } else {
                  break;
              }

            case 'Amazon' :
              cutting = Number(msg.replace('*판매 Amazon ', ''));
              if (isNaN(Number(cutting))) {
                  replier.reply('숫자를 입력해주세요.');
                  return;
              } else if (cutting > 500) {
                  replier.reply('보유한 주식의 개수가 부족합니다.');
                  return;
              } else if (0 < Amazon) {
                  DataBase.setDataBase('Z2 '+sender+' is money', money+RP6*cutting);
                  DataBase.setDataBase('Z2 '+sender+' is Nvidia', Amazon-cutting);
                  replier.reply('주식 "Amazon"를 "'+cutting+'개 판매하셨습니다.\n(자세한 정보는 *주식봇 내정보)');
                  return;
              } else {
                  break;
              }

            default :
              replier.reply('존재 하지않는 주식 이름입니다.');
              return;
        }
    }
  }
}

function onStart(activity) {}

function onResume(activity) {}

function onPause(activity) {}

function onStop(activity) {}

function setting (sender) {
  DataBase.setDataBase('Z2 '+sender+' is money', 100000);
  DataBase.setDataBase('Z2 '+sender+' is Apple', 0);
  DataBase.setDataBase('Z2 '+sender+' is Samsung', 0);
  DataBase.setDataBase('Z2 '+sender+' is Microsoft', 0);
  DataBase.setDataBase('Z2 '+sender+' is Intel', 0);
  DataBase.setDataBase('Z2 '+sender+' is Nvidia', 0);
  DataBase.setDataBase('Z2 '+sender+' is Amazon', 0);
}

function show_important (sender, replier) {
  text = '⎊돈 : '+DataBase.getDataBase('Z2 '+sender+' is money');
  text += '\n------------\n[ 보유한 주식의 종류와 개수 ]\n\n⎊Apple : '+DataBase.getDataBase('Z2 '+sender+' is Apple');
  text += '\n⎊Samsung : '+DataBase.getDataBase('Z2 '+sender+' is Samsung');
  text += '\n⎊Microsoft : '+DataBase.getDataBase('Z2 '+sender+' is Microsoft');
  text += '\n⎊Intel : '+DataBase.getDataBase('Z2 '+sender+' is Intel');
  text += '\n⎊Nvidia : '+DataBase.getDataBase('Z2 '+sender+' is Nvidia');
  text += '\n⎊Amazon : '+DataBase.getDataBase('Z2 '+sender+' is Amazon');

  let ad = AD[Math.floor(Math.random() * 4)];
  replier.reply('[ ⌜'+sender+'⌟ 님의 정보 ]\n'+allsee+text+'\n\n[ AD ]\n'+ad);
}
