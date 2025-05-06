(function () {
    const config = window.SupportChatConfig || {};
    const position = config.position === 'left' ? 'left' : 'right';
    const iconColor = config.iconColor || '#1890ff';
    const headerText = config.headerText || 'Live Chat';

    const container = document.createElement('div');
    container.id = 'support-chat';
    container.style.position = 'fixed';
    container.style.bottom = '20px';
    container.style[position] = '20px';
    container.style.zIndex = 9999;

    // --- Chat Button ---
    const toggleBtn = document.createElement('button');
    toggleBtn.innerHTML = '💬';
    toggleBtn.style.backgroundColor = iconColor;
    toggleBtn.style.border = 'none';
    toggleBtn.style.color = 'white';
    toggleBtn.style.width = '50px';
    toggleBtn.style.height = '50px';
    toggleBtn.style.borderRadius = '50%';
    toggleBtn.style.cursor = 'pointer';

    // --- Chat Box ---
    const chatBox = document.createElement('div');
    chatBox.style.display = 'none';
    chatBox.style.width = '300px';
    chatBox.style.height = '400px';
    chatBox.style.backgroundColor = 'white';
    chatBox.style.border = '1.2px solid #ccc';
    chatBox.style.marginTop = '10px';
    chatBox.style.display = 'none';

    chatBox.innerHTML = `
      <div style="background: ${iconColor}; color: white; padding: 10px; position: relative;">
        <span id="chat-close" style="position: absolute; right: 10px; top: 5px; cursor: pointer; font-size: 18px;">×</span>
        ${headerText}
      </div>
      <div id="chat-body" style="height: 300px; overflow-y: auto; padding: 10px; font-family: sans-serif; font-size: 14px;"></div>
      <div style="display: flex; padding: 10px; gap: 5px;">
        <input id="chat-input" style="flex: 1; padding: 8px; border: 1px solid #ccc;" placeholder="Type a message..." />
        <button id="chat-send" style="padding: 8px 10px; background: ${iconColor}; color: white; border: none;">Send</button>
      </div>
    `;

    // --- Toggle Logic ---
    toggleBtn.addEventListener('click', () => {
        chatBox.style.display = 'block';
        toggleBtn.style.display = 'none';
    });

    // --- Close Chat Logic ---
    chatBox.querySelector('#chat-close').addEventListener('click', () => {
        chatBox.style.display = 'none';
        toggleBtn.style.display = 'inline-block';
    });

    // --- Message Logic ---
    const input = chatBox.querySelector('#chat-input');
    const sendBtn = chatBox.querySelector('#chat-send');
    const chatBody = chatBox.querySelector('#chat-body');

    function sendMessage() {
        const text = input.value.trim();
        if (!text) return;

        const msg = document.createElement('div');
        msg.textContent = text;
        msg.style.margin = '5px 0';
        msg.style.background = '#f1f1f1';
        msg.style.padding = '8px';
        msg.style.borderRadius = '5px';
        msg.style.alignSelf = 'flex-end';
        msg.style.textAlign = 'right';

        chatBody.appendChild(msg);
        chatBody.scrollTop = chatBody.scrollHeight;
        input.value = '';
    }

    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    sendBtn.addEventListener('click', sendMessage);

    container.appendChild(toggleBtn);
    container.appendChild(chatBox);
    document.body.appendChild(container);
})();
