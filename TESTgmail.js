import jsbase64

email = "You got me! I surrender."
userId ="yangxl689468@126.com"
createDraft(userId,email,sendDraft())

function createDraft(userId, email, callback) {
  // Using the js-base64 library for encoding:
  // https://www.npmjs.com/package/js-base64
  var base64EncodedEmail = Base64.encodeURI(email);
  var request = gapi.client.gmail.users.drafts.create({
    'userId': userId,
    'resource': {
      'message': {
        'raw': base64EncodedEmail
      }
    }
  });
  request.execute(callback);

function sendDraft(Gmail service,String userId, String draftId``){
    print "okay"
}
}