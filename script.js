// トークンの確認
document.getElementById('tokenForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const token = document.getElementById('token').value;

    try {
        const response = await fetch('https://api.github.com/user', {
            method: 'GET',
            headers: {
                'Authorization': `token ${token}`
            }
        });

        if (response.ok) {
            const data = await response.json();
            document.getElementById('tokenResponse').textContent = `トークンが有効です。ユーザー名: ${data.login}`;
            enableCalcForm();
        } else {
            document.getElementById('tokenResponse').textContent = 'トークンが無効です。再入力してください。';
        }
    } catch (error) {
        document.getElementById('tokenResponse').textContent = `エラーが発生しました: ${error.message}`;
    }
});

// 計算式の確認
document.getElementById('calcForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const expression = document.getElementById('expression').value;

    try {
        const result = eval(expression);
        document.getElementById('calcResponse').textContent = `計算結果: ${result}`;
        enablePushForm(result);
    } catch (error) {
        document.getElementById('calcResponse').textContent = '計算式が無効です。再入力してください。';
    }
});

// GitHubへのプッシュ
document.getElementById('pushForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const token = document.getElementById('token').value;
    const expression = document.getElementById('expression').value;
    const result = document.getElementById('result').value;

    const content = `式: ${expression}\n結果: ${result}`;
    const contentBase64 = btoa(unescape(encodeURIComponent(content)));

    try {
        const response = await fetch('https://api.github.com/repos/Ry02024/SimpleCalc/contents/calculation_result.txt', {
            method: 'PUT',
            headers: {
                'Authorization': `token ${token}`,
                'Accept': 'application/vnd.github.v3+json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: "Add calculation result",
                content: contentBase64
            })
        });

        if (response.ok) {
            document.getElementById('pushResponse').textContent = 'ファイルが正常にGitHubにプッシュされました。';
        } else {
            const data = await response.json();
            document.getElementById('pushResponse').textContent = `エラー: ${data.message}`;
        }
    } catch (error) {
        document.getElementById('pushResponse').textContent = `リクエストエラー: ${error.message}`;
    }
});

// フォームの有効化
function enableCalcForm() {
    document.getElementById('expression').disabled = false;
    document.querySelector('#calcForm button').disabled = false;
}

function enablePushForm(result) {
    document.getElementById('result').value = result;
    document.getElementById('result').disabled = false;
    document.querySelector('#pushForm button').disabled = false;
}
