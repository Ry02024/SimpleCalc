document.getElementById('githubForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const token = document.getElementById('token').value;
    const expression = document.getElementById('expression').value;
    const result = document.getElementById('result').value;

    const content = `式: ${expression}\n結果: ${result}`;
    const contentBase64 = btoa(unescape(encodeURIComponent(content)));

    try {
        const response = await fetch('https://api.github.com/repos/YourGitHubUsername/YourRepoName/contents/calculation_result.txt', {
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

        const data = await response.json();
        if (response.ok) {
            document.getElementById('response').textContent = 'ファイルが正常にGitHubにプッシュされました。';
        } else {
            document.getElementById('response').textContent = `エラー: ${data.message}`;
        }
    } catch (error) {
        document.getElementById('response').textContent = `リクエストエラー: ${error.message}`;
    }
});
