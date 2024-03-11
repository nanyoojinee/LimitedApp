// utils/slack.js 파일을 생성하여 아래 함수 추가


async function sendSlackNotification(message) {
    const webhookUrl = "https://hooks.slack.com/services/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";
    try {
        const response = await fetch(webhookUrl, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: message }),
        });

        if (!response.ok) {
            throw new Error(`Error: Slack notification failed with status ${response.status}`);
        }
    } catch (error) {
        console.error(error);
    }
}

export { sendSlackNotification };
