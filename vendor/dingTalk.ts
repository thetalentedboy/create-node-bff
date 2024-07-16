import axios from 'axios';
import crypto from 'crypto';

const secret = 'xxxxx';
const host = 'https://oapi.dingtalk.com/robot/send?access_token=xxxxxxxxxxxxxx';

function sendMessage(title: string, content: string): Promise<void> {
    return new Promise(resolve => {
        if (process.env.NODE_ENV !== 'development') {
            const data = {
                msgtype: 'markdown',
                markdown: {
                    title,
                    text: `### **【ssr-api监控报警】**\n\n ### **标题**：${title} \n\n **内容**：${content} \n\n`
                }
            };
            const hmac = crypto.createHmac('sha256', secret);
            const timestamp = Date.now();
            
            hmac.update(`${timestamp}\n${secret}`);

            const sign = hmac.digest('base64');

            axios({
                url: `${host}&timestamp=${timestamp}&sign=${sign}`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(data)
            })
                .then(() => {
                    resolve();
                })
                .catch(err => {
                    console.log(err);
                    resolve();
                });
        } else {
            resolve();
        }
    });
}

export default sendMessage;
