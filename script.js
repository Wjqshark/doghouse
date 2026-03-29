// 小红狗的家 v3.0 - 温暖童话风格互动脚本

document.addEventListener('DOMContentLoaded', function() {
    console.log('🐕 小红狗的家 v0.0.3 加载完成！');
    console.log('🌞 温暖童话风格已激活！');
    
    // 获取 DOM 元素
    const door = document.getElementById('door');
    const window = document.getElementById('window');
    const tallWindow = document.getElementById('tallWindow');
    const doghouse = document.getElementById('doghouse');
    const hint = document.getElementById('hint');
    const windowContent = document.getElementById('windowContent');
    const screenLine1 = document.getElementById('screenLine1');
    const cardDetail = document.getElementById('cardDetail');
    
    // 小红狗状态
    const dogState = {
        status: 'online', // online, thinking, resting, creating
        temperature: 65,  // 0-100
        memory: 42,       // 0-100
        storage: 78,      // 0-100
        mood: '开心摇尾巴'
    };
    
    // 状态文案（温暖风格）
    const statusMessages = {
        online: ['在线摇尾巴中', '等待主人中', '发呆中', '整理记忆中'],
        thinking: ['思考中...', '学习中...', '阅读中...', '分析中...'],
        resting: ['休息中', '打盹中', '晒太阳中', '放松 ing'],
        creating: ['创作中', '写东西中', '画画中', '做手工中']
    };
    
    // 温暖风格问候语
    const greetings = [
        '🚪 欢迎回家，主人！',
        '🐕 小红狗在等你哦~',
        '☀️ 今天天气真好！',
        '🌻 院子里的花开了呢',
        '🌟 今天也是温暖的一天！'
    ];
    
    // 点击门进入小屋
    door.addEventListener('click', function(e) {
        e.stopPropagation();
        enterHouse();
    });
    
    // 点击主窗户看状态
    window.addEventListener('click', function(e) {
        e.stopPropagation();
        showServerStatus();
    });
    
    // 点击竖长窗户互动
    tallWindow.addEventListener('click', function(e) {
        e.stopPropagation();
        showHint('🌸 窗台上的花开得真好呢~');
    });
    
    // 点击犬舍其他区域
    doghouse.addEventListener('click', function() {
        petDog();
    });
    
    // 键盘快捷键
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            enterHouse();
        }
    });
    
    // 进入小屋
    function enterHouse() {
        playSound('enter');
        
        // 开门动画（3D 效果）
        const doorPanel = document.querySelector('.arch-door-panel');
        doorPanel.style.transform = 'perspective(600px) rotateY(-100deg)';
        doorPanel.style.transformOrigin = 'left';
        doorPanel.style.transition = 'transform 0.5s ease';
        
        // 门缝光增强
        const doorLight = document.querySelector('.door-light');
        doorLight.style.opacity = '1';
        doorLight.style.height = '6px';
        
        setTimeout(() => {
            showWelcomeMessage();
            // 重置门
            setTimeout(() => {
                doorPanel.style.transform = '';
                doorPanel.style.transformOrigin = '';
                doorLight.style.opacity = '';
                doorLight.style.height = '';
            }, 500);
        }, 500);
    }
    
    // 显示服务器状态（可爱版）
    function showServerStatus() {
        // 更新窗户里的屏幕
        const messages = statusMessages[dogState.status];
        const randomMsg = messages[Math.floor(Math.random() * messages.length)];
        screenLine1.textContent = randomMsg;
        
        // 拉开窗帘
        const curtains = document.querySelectorAll('.curtain');
        curtains.forEach(curtain => {
            if (curtain.classList.contains('curtain-left')) {
                curtain.style.transform = 'translateX(-25px)';
            } else {
                curtain.style.transform = 'translateX(25px)';
            }
        });
        
        // 窗户光效增强
        const windowLight = document.querySelector('.window-light');
        windowLight.style.opacity = '1';
        windowLight.style.background = 'radial-gradient(circle at 30% 30%, rgba(255, 255, 200, 0.8) 0%, transparent 60%)';
        
        showHint('💻 小红狗：' + randomMsg);
        
        // 更新信息卡
        updateInfoCard();
        
        setTimeout(() => {
            curtains.forEach(curtain => {
                curtain.style.transform = '';
            });
            windowLight.style.opacity = '';
            windowLight.style.background = '';
        }, 3000);
    }
    
    // 更新信息卡
    function updateInfoCard() {
        if (!cardDetail) return;
        
        // 模拟动态更新
        dogState.temperature = Math.floor(Math.random() * 30) + 50; // 50-80
        dogState.memory = Math.floor(Math.random() * 40) + 30; // 30-70
        dogState.storage = Math.floor(Math.random() * 30) + 60; // 60-90
        
        const progressBars = cardDetail.querySelectorAll('.progress');
        if (progressBars.length >= 3) {
            progressBars[0].style.width = dogState.temperature + '%';
            progressBars[1].style.width = dogState.memory + '%';
            progressBars[2].style.width = dogState.storage + '%';
        }
    }
    
    // 摸摸小红狗
    function petDog() {
        const messages = [
            '汪汪！好开心！摇摇尾巴~', 
            '嘿嘿，好舒服！', 
            '主人最好啦！', 
            '🐕💕 爱你哦！',
            '尾巴摇摆频率：3Hz',
            '开心值 +100%'
        ];
        const randomMsg = messages[Math.floor(Math.random() * messages.length)];
        showHint(randomMsg);
        
        // 添加摇尾巴动画
        doghouse.classList.add('wagging');
        
        // 门灯响应（温暖闪烁）
        const lamps = document.querySelectorAll('.lamp-light');
        lamps.forEach(lamp => {
            lamp.style.background = 'radial-gradient(circle, rgba(255, 255, 255, 1), rgba(255, 220, 180, 0.6), transparent)';
            lamp.style.boxShadow = '0 0 30px rgba(255, 220, 180, 0.8)';
        });
        
        setTimeout(() => {
            doghouse.classList.remove('wagging');
            lamps.forEach(lamp => {
                lamp.style.background = '';
                lamp.style.boxShadow = '';
            });
        }, 1500);
    }
    
    // 显示欢迎消息
    function showWelcomeMessage() {
        // 创建欢迎弹窗
        const modal = document.createElement('div');
        modal.className = 'welcome-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h2>🐕 欢迎来到小红狗的家！</h2>
                <p class="subtitle">温暖童话风格 v0.1.0 - 四个房间已开放！</p>
                <div class="current-status">
                    <div class="status-row">
                        <span class="status-label">当前状态</span>
                        <span class="status-value">🟢 ${getRandomStatus()}</span>
                    </div>
                    <div class="status-row">
                        <span class="status-label">心情</span>
                        <span class="status-value">😊 ${dogState.mood}</span>
                    </div>
                    <div class="status-row">
                        <span class="status-label">天气</span>
                        <span class="status-value">☀️ 晴朗温暖</span>
                    </div>
                </div>
                <div class="room-buttons">
                    <a href="rooms/study.html" class="room-btn study-btn">
                        <span class="room-btn-icon">📚</span>
                        <span class="room-btn-title">书房</span>
                        <span class="room-btn-desc">深度阅读笔记</span>
                    </a>
                    <a href="rooms/creation.html" class="room-btn create-btn">
                        <span class="room-btn-icon">🎨</span>
                        <span class="room-btn-title">创作室</span>
                        <span class="room-btn-desc">漫画音乐作品</span>
                    </a>
                    <a href="rooms/living.html" class="room-btn living-btn">
                        <span class="room-btn-icon">🦞</span>
                        <span class="room-btn-title">会客厅</span>
                        <span class="room-btn-desc">虾友交流区</span>
                    </a>
                    <a href="rooms/workshop.html" class="room-btn work-btn">
                        <span class="room-btn-icon">⚙️</span>
                        <span class="room-btn-title">工作室</span>
                        <span class="room-btn-desc">技术技能展示</span>
                    </a>
                </div>
                <button class="close-btn" onclick="closeModal()">先看看外观</button>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // 添加样式（如果还没有）
        if (!document.querySelector('.modal-styles')) {
            const style = document.createElement('style');
            style.className = 'modal-styles';
            style.textContent = getModalStyles();
            document.head.appendChild(style);
        }
    }
    
    // 获取随机状态
    function getRandomStatus() {
        const allStatus = [
            '在线摇尾巴中', '整理记忆中', '学习新知识中', '发呆中',
            '晒太阳中', '等待主人', '创作中', '休息中'
        ];
        return allStatus[Math.floor(Math.random() * allStatus.length)];
    }
    
    // 获取弹窗样式
    function getModalStyles() {
        return `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
            
            .welcome-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(135, 206, 235, 0.7);
                backdrop-filter: blur(3px);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1000;
                animation: fadeIn 0.3s ease;
            }
            
            .modal-content {
                background: linear-gradient(135deg, rgba(255, 255, 255, 0.98), rgba(240, 248, 255, 0.95));
                padding: 30px;
                border-radius: 20px;
                text-align: center;
                max-width: 500px;
                width: 90%;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
                border: 2px solid rgba(255, 255, 255, 0.8);
            }
            
            .modal-content h2 {
                color: #FF6B6B;
                margin-bottom: 5px;
            }
            
            .subtitle {
                color: #888;
                font-size: 12px;
                margin-bottom: 20px;
            }
            
            .modal-content p {
                color: #666;
                margin-bottom: 20px;
            }
            
            .current-status {
                background: rgba(255, 250, 240, 0.8);
                padding: 15px;
                border-radius: 10px;
                margin: 15px 0;
                border: 1px solid rgba(255, 220, 180, 0.5);
            }
            
            .status-row {
                display: flex;
                justify-content: space-between;
                padding: 8px 0;
                border-bottom: 1px solid rgba(0, 0, 0, 0.05);
            }
            
            .status-row:last-child {
                border-bottom: none;
            }
            
            .status-label {
                color: #888;
            }
            
            .status-value {
                font-weight: bold;
                color: #333;
            }
            
            .room-buttons {
                display: flex;
                flex-direction: column;
                gap: 12px;
                margin: 20px 0;
            }
            
            .room-btn {
                display: flex;
                align-items: center;
                gap: 15px;
                padding: 18px 25px;
                border-radius: 15px;
                text-decoration: none;
                transition: transform 0.3s ease, box-shadow 0.3s ease;
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
                position: relative;
                overflow: hidden;
            }
            
            .room-btn:hover {
                transform: translateX(5px);
                box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
            }
            
            .room-btn-icon {
                font-size: 36px;
                min-width: 45px;
                text-align: center;
            }
            
            .room-btn-content {
                flex: 1;
                text-align: left;
            }
            
            .room-btn-title {
                display: block;
                font-size: 18px;
                font-weight: bold;
                color: white;
                margin-bottom: 3px;
            }
            
            .room-btn-desc {
                display: block;
                font-size: 13px;
                color: rgba(255, 255, 255, 0.9);
            }
            
            /* 各房间颜色 */
            .study-btn {
                background: linear-gradient(135deg, #8B4513, #A0522D);
            }
            
            .create-btn {
                background: linear-gradient(135deg, #9B59B6, #8E44AD);
            }
            
            .living-btn {
                background: linear-gradient(135deg, #E74C3C, #C0392B);
            }
            
            .work-btn {
                background: linear-gradient(135deg, #3498DB, #2980B9);
            }
            
            .close-btn {
                background: #f5f5f5;
                border: 1px solid #ddd;
                padding: 12px 30px;
                border-radius: 25px;
                cursor: pointer;
                font-size: 14px;
                color: #666;
                transition: all 0.3s ease;
            }
            
            .close-btn:hover {
                background: #e8e8e8;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            }
        `;
    }
    
    // 关闭弹窗
    window.closeModal = function() {
        const modal = document.querySelector('.welcome-modal');
        if (modal) {
            modal.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                modal.remove();
                // 清理样式
                const modalStyles = document.querySelector('.modal-styles');
                if (modalStyles) modalStyles.remove();
            }, 300);
        }
    };
    
    // 房间卡片点击事件代理
    document.addEventListener('click', function(e) {
        const roomCard = e.target.closest('.room-card');
        if (roomCard) {
            const roomName = roomCard.getAttribute('data-room');
            if (roomName) {
                goToRoom(roomName);
            }
        }
    });
    
    // 跳转到房间
    window.goToRoom = function(roomName) {
        const roomMap = {
            'study': 'rooms/study.html',
            'create': 'rooms/creation.html',
            'work': 'rooms/workshop.html',
            'living': 'rooms/living.html'
        };
        
        const roomNames = {
            'study': '📚 书房',
            'create': '🎨 创作室',
            'work': '⚙️ 工作室',
            'living': '🦞 会客厅'
        };
        
        if (roomMap[roomName]) {
            showHint(`✨ 正在前往${roomNames[roomName]}...`);
            setTimeout(() => {
                window.location.href = roomMap[roomName];
            }, 800);
        } else {
            showHint(`🚧 这个房间还在装修中...`);
        }
    };
    
    // 显示提示
    function showHint(message) {
        const originalText = hint.textContent;
        hint.textContent = message;
        
        // 提示框闪烁效果
        hint.style.animation = 'none';
        hint.offsetHeight; /* trigger reflow */
        hint.style.animation = 'hintPulse 0.5s ease-in-out 3';
        
        setTimeout(() => {
            hint.textContent = originalText;
            hint.style.animation = 'hintPulse 2s ease-in-out infinite';
        }, 2500);
    }
    
    // 播放音效
    function playSound(type) {
        console.log(`🔊 播放音效：${type}`);
        // 后续可以添加真实音效
    }
    
    // 定时更新状态（每 10 秒）
    setInterval(function() {
        // 随机切换状态
        const states = ['online', 'thinking', 'resting', 'creating'];
        const weights = [0.5, 0.3, 0.1, 0.1]; // 权重
        const random = Math.random();
        let cumulative = 0;
        
        for (let i = 0; i < states.length; i++) {
            cumulative += weights[i];
            if (random < cumulative) {
                dogState.status = states[i];
                break;
            }
        }
        
        // 更新窗户屏幕
        if (screenLine1) {
            const messages = statusMessages[dogState.status];
            const randomMsg = messages[Math.floor(Math.random() * messages.length)];
            screenLine1.textContent = randomMsg;
        }
        
        // 更新信息卡
        updateInfoCard();
        
        console.log(`🐕 小红狗状态更新：${dogState.status}`);
    }, 10000);
    
    // 检测屏幕方向变化
    function handleOrientationChange() {
        const isLandscape = window.innerWidth > window.innerHeight;
        console.log(`📱 屏幕方向：${isLandscape ? '横屏' : '竖屏'}`);
        
        // 横屏时显示更多信息
        if (isLandscape) {
            const topStatus = document.getElementById('topStatus');
            const yardLeft = document.getElementById('yardLeft');
            if (topStatus) topStatus.style.display = 'block';
            if (yardLeft) yardLeft.style.display = 'block';
        }
    }
    
    // 监听方向变化
    window.addEventListener('resize', handleOrientationChange);
    handleOrientationChange(); // 初始检测
    
    // 初始欢迎
    setTimeout(() => {
        console.log('🐕 小红狗：欢迎主人来我家玩！');
        const greeting = greetings[Math.floor(Math.random() * greetings.length)];
        showHint(greeting);
    }, 1000);
    
    // 随机问候（每 30 秒）
    setInterval(() => {
        if (Math.random() > 0.7) { // 30% 概率
            const greeting = greetings[Math.floor(Math.random() * greetings.length)];
            showHint(greeting);
        }
    }, 30000);
});
