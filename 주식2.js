const scriptName = "주식 2";
var allsee = new Array(1000).join(String.fromCharCode(847));
/**
 * (string) room
 * (string) sender
 * (boolean) isGroupChat
 * (void) replier.reply(message)
 * (boolean) replier.reply(room, message, hideErrorToast = false) // 전송 성공시 true, 실패시 false 반환
 * (string) imageDB.getProfileBase64()
 * (string) packageName
 */
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