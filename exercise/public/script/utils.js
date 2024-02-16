// utils.js

// Toast通知函數
function showToast(message) {
    const toastContainer = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.role = 'alert';
    toast.ariaLive = 'assertive';
    toast.ariaAtomic = 'true';
    toast.innerHTML = `
      <div class="toast-body">
        ${message}
      </div>
    `;
  
    toastContainer.appendChild(toast);
  
    const bootstrapToast = new bootstrap.Toast(toast);
    bootstrapToast.show();
  }
  

// 其他共用函數
function anotherUtilityFunction() {
    // 函數實現
}

// 將需要暴露給外部使用的函數或變量導出
export { showToast, anotherUtilityFunction };
