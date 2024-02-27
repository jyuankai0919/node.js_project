import { createApp } from 'vue';

const app = createApp({
    data() {
      return {
        email: '',
        password: '',
        name: ''
      };
    },
    methods: {
      register() {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        if (!passwordRegex.test(this.password)) {
          alert('密碼必須包含大小寫英文字母和數字，且至少8位長');
          return;
        }
        
        fetch('/auth/Api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: this.email,
            password: this.password,
            name: this.name
          })
        })
        .then(response => response.json())
        .then(data => {
          if (data.msg) {
            this.showNotice(data.msg);
            alert(data.msg);
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
      },
      showNotice(msg) {
        console.log(msg);
      }
    }
  });

  app.mount('#app');
