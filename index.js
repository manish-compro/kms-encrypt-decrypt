const aws = require('aws-sdk');
aws.config.update({ region: 'ap-south-1' });
const kms = new aws.KMS();


async function encrypt(source) {
    const params = {
        KeyId: 'arn:aws:kms:ap-south-1:003801200385:alias/CMK_TEST_ash',
        Plaintext: source,
    };
    const { CiphertextBlob } = await kms.encrypt(params).promise();

    return CiphertextBlob.toString('base64');
}

// source is plaintext
async function decrypt(source) {
    const params = {
        CiphertextBlob: Buffer.from(source, 'base64'),
    };
    const { Plaintext } = await kms.decrypt(params).promise();
    return Plaintext.toString();
}

async function key(){
    const KeyId = 'arn:aws:kms:ap-south-1:003801200385:alias/CMK_TEST_ash';
    const data = await kms.describeKey({ KeyId }).promise();

    return data
}

const data = "hello-world"

//Encrption
encrypt(data).then((d) => {
    console.log("Encrypted: ",d);
});

//view CMK
key().then((d) => {
    console.log("keys :", d);
});

//dycryption
let encrypted = 'AQICAHh8RpzjGXfwWwn/bnPkACzViwJrPAbiJYQCMdytfO6EPAGNOccNCkZpcCCiPvmYLezyAAAAaTBnBgkqhkiG9w0BBwagWjBYAgEAMFMGCSqGSIb3DQEHATAeBglghkgBZQMEAS4wEQQMGDY+l2tcyK5Iw9PlAgEQgCYPwv80I+kE2fcvqIL6OAH3yNFVcJWPlkIRnaiyo+WovIbI0F0D6A=='
decrypt(encrypted).then((d) => {
    console.log("Decrypted",d);
})





