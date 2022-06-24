const scriptName = "주식 2";
var allsee = new Array(1000).join(String.fromCharCode(847));
const AD = ['주가가 올라갈수록 변동폭이 커집니다!', '환전기능이 생길꺼라는 소문이 있다던데?', '도움말은 "$주식봇 도움말" !'];
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
    RP1 = parseInt(DataBase.getDataBase('RP'+ii));
    RO1 = parseInt(RE1 / 100 * RP1);
    DataBase.setDataBase('RO'+ii, RO1);
    DataBase.setDataBase('RP'+ii, RP1+RO1);
    if (RP1 < 10000) {
      DataBase.setDataBase('RP'+ii, 10000);
      DataBase.setDataBase('RO'+ii, 'ReSet');
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
  if (msg == '$가입') {
    if (joinbot.includes(sender)) {
      replier.reply('이미 가입 하셨습니다. 만약 가입하지 않으셨다면 다른 유저가 해당 닉네임을 사용하고 있을수 있습니다.');
    } else if (sender.includes('\n')||sender.includes('@')||sender.includes('\'')) {
      replier.reply('일부 특수문자가 포함된 닉네임은 가입이 불가능 합니다.');
    } else {
      DataBase.setDataBase('주식게임-2 가입리스트', DataBase.getDataBase('주식게임-2 가입리스트')+'\n'+sender);
      setting(sender);
      replier.reply('성공적으로 등록되었습니다. (도움말은 $주식봇 도움말)');
    }
  }
  if (message[0] == '$주식봇') {
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
            let username = msg.replace('$주식봇 정보 ', '');
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
            RP1 = Number(DataBase.getDataBase('RP1'));
            RP2 = Number(DataBase.getDataBase('RP2'));
            RP3 = Number(DataBase.getDataBase('RP3'));
            RP4 = Number(DataBase.getDataBase('RP4'));
            RP5 = Number(DataBase.getDataBase('RP5'));
            RP6 = Number(DataBase.getDataBase('RP6'));
            replier.reply('[ 주가 ]\nApple : '+RP1+'\n-------------\nSamsung : '+RP2+'\n-------------\nMicrosoft : '+RP3+'\n-------------\nIntel : '+RP4+'\n-------------\nNvidia : '+RP5+'\n-------------\nAmazon : '+RP6);
            break;
          
          case '도움말' :
            replier.reply('[ 주식봇 도움말 ]\n\n'+allsee+'$주식봇 [내정보 , 정보 (플레이어 이름), 주가, code]');
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
}

function onStart(activity) {}

function onResume(activity) {}

function onPause(activity) {}

function onStop(activity) {}

function setting (sender) {
  DataBase.setDataBase('Z2 '+sender+' is money', 20);
  DataBase.setDataBase('Z2 '+sender+' is Z', 1);
}

function show_important (sender, replier) {
  text = '⎊돈 : '+DataBase.getDataBase('Z2 '+sender+' is money');
  text += '\n⎊주식 : '+DataBase.getDataBase('Z2 '+sender+' is Z');

  replier.reply('[ ⌜'+sender+'⌟ 님의 정보 ]\n\n'+allsee+text);
}