(function () {
    const config = window.SupportChatConfig || {};
    const position = config.position === 'left' ? 'left' : 'right';
    const iconColor = config.iconColor || '#1890ff';
    const headerText = config.headerText || 'Live Chat';

    const chatContainer = document.createElement('div');
    chatContainer.id = 'support-chat';
    chatContainer.innerHTML = `
      <div style="position: fixed; bottom: 20px; ${position}: 20px; width: 300px; height: 400px; background: white; border: 1px solid #ccc; box-shadow: 0 2px 8px rgba(0,0,0,0.2);">
        <div id="chat-header" style="background: ${iconColor}; color: white; padding: 10px;">${headerText}</div>
        <div id="chat-body" style="height: 320px; overflow-y: auto; padding: 10px;"></div>
        <input id="chat-input" style="width: 280px; padding: 8px;" placeholder="Type a message..." />
      </div>
    `;

    document.body.appendChild(chatContainer);

    const input = document.getElementById('chat-input');
    input.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            console.log('Send:', input.value);
            input.value = '';
        }
    });
})();
