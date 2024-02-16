// toast容器。
document.addEventListener('DOMContentLoaded', (event) => {
    const toastContainerHTML = `
        <div aria-live="polite" aria-atomic="true" class="position-relative">
            <div id="toastContainer" class="toast-container position-fixed top-0 end-0 p-3">
                <!-- Toasts會在這裡添加 -->
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', toastContainerHTML);
});
