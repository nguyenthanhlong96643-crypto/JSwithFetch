document.addEventListener('DOMContentLoaded', function() {
    const catButton = document.getElementById('catButton');
    const catImage = document.getElementById('catImage');
    const counter = document.getElementById('counter');
    const catId = document.getElementById('catId');
    const callCount = document.getElementById('callCount');
    
    // 初始化计数
    let count = 0;
    
    catButton.addEventListener('click', function() {
        // 使用免费的猫咪图片API
        const apiUrl = 'https://api.thecatapi.com/v1/images/search?size=full';
        
        // 显示加载状态
        catButton.disabled = true;
        catButton.textContent = '正在召唤猫咪...';
        
        // 发送请求获取猫咪图片
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('网络响应错误');
                }
                return response.json();
            })
            .then(data => {
                // 获取图片URL和ID
                const imageUrl = data[0].url;
                const id = data[0].id;
                
                // 更新计数
                count++;
                
                // 显示图片和计数器
                catImage.src = imageUrl;
                catImage.classList.remove('hidden');
                catId.textContent = id;
                callCount.textContent = count;
                counter.classList.remove('hidden');
                
                // 恢复按钮状态
                catButton.disabled = false;
                catButton.textContent = '召唤一只猫咪！';
            })
            .catch(error => {
                console.error('获取猫咪图片失败:', error);
                alert('获取猫咪图片失败，请稍后重试。');
                
                // 恢复按钮状态
                catButton.disabled = false;
                catButton.textContent = '召唤一只猫咪！';
            });
    });
});