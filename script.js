document.getElementById('calculateBtn').addEventListener('click', function() {
    const expression = document.getElementById('expression').value;
    let result;
    try {
        // `eval`関数で数式を評価して計算結果を取得
        result = eval(expression);
        document.getElementById('result').textContent = '結果: ' + result;
    } catch (error) {
        document.getElementById('result').textContent = 'エラー: 無効な数式です';
    }
});
