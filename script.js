document.getElementById('tokenForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    console.log('Token form submitted'); // フォームが送信されたことを確認

    const token = document.getElementById('token').value;
    console.log('Token:', token); // トークンが正しく取得されているかを確認

    try {
        const response = await fetch('https://api.github.com/user', {
            method: 'GET',
            headers: {
                'Authorization': `token ${token}`
            }
        });

        console.log('GitHub API response status:', response.status); // APIリクエストのステータスを確認

        if (response.ok) {
            const data = await response.json();
            console.log('GitHub user data:', data); // GitHub APIからのレスポンスデータを確認
            document.getElementById('tokenResponse').textContent = `トークンが有効です。ユーザー名: ${data.login}`;
            enableCalcForm();
        } else {
            console.log('Invalid token response received'); // トークンが無効な場合のログ
            document.getElementById('tokenResponse').textContent = 'トークンが無効です。再入力してください。';
        }
    } catch (error) {
        console.error('Error occurred during token validation:', error.message); // エラーメッセージを表示
        document.getElementById('tokenResponse').textContent = `エラーが発生しました: ${error.message}`;
    }
});

function enableCalcForm() {
    console.log('Enabling calculation form'); // 計算フォームが有効になったことを確認
    document.getElementById('expression').disabled = false;
    document.querySelector('#calcForm button').disabled = false;
}
