import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../shared/auth.service';
import { saveUsersToLocalStorage, loadUsersFromLocalStorage, addUserToLocalStorage } from '../shared/data';


@Component({
  selector: 'app-auth',
  standalone: false,
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {

  constructor(private router: Router, public authService: AuthService) {
  }

  isLoginActive = true;


  showLogin() {
    this.isLoginActive = true;
  }

  showRegister() {
    this.isLoginActive = false;
  }

  backMain(){
    this.router.navigate(['/']).then()
  }

  userLogin = ''
  userPassword = ''

  onLogin() {

    const res = this.authService.login(this.userLogin, this.userPassword);
    if (this.authService.isLoggedIn) {
      this.router.navigate(['/user']).then();
    } else {
      alert('НЕВЕРНО ВВЕДЕН ЛОГИН ИЛИ ПАРОЛЬ');
    }
  }

  newName = ''
  newLogin = ''
  newPassword = ''
  newPassword2 = ''
  arr: string[] = []

  onRegister() {
    this.arr = [];

    if (!this.newName.trim()) {
      this.arr.push("Имя не может быть пустым");
    } else {
      if (!this.newName.match(/^[А-ЯA-Z][а-яa-z]*$/u)) {
        this.arr.push("Имя должно начинаться с заглавной буквы и содержать только буквы");
      }

      if (this.newName.length < 3) {
        this.arr.push("Имя должно быть не менее 3 символов");
      }
    }

    if (!this.newLogin.trim()) {
      this.arr.push("Логин не может быть пустым");
    } else {
      const users = loadUsersFromLocalStorage();
      const userExists = users.some(u => u.username === this.newLogin);

      if (userExists) {
        this.arr.push("Такой логин уже существует, придумайте, пожалуйста, новый");
      }

      if (this.newLogin.length < 3) {
        this.arr.push("Логин должен быть не менее 3 символов");
      }
    }

    if (!this.newPassword || !this.newPassword2) {
      this.arr.push("Пароль и подтверждение пароля не могут быть пустыми");
    } else if (this.newPassword !== this.newPassword2) {
      this.arr.push("Пароли не совпадают");
    } else {
      if (this.newPassword.length < 5) {
        this.arr.push("Пароль должен быть длиннее 5 символов");
      }

      if (!/[A-Z]/.test(this.newPassword)) {
        this.arr.push("Используйте хотя бы одну заглавную букву в пароле");
      }

      if (!/\d/.test(this.newPassword)) {
        this.arr.push("Используйте цифры в пароле");
      }

      if (/(.)\1{2,}/.test(this.newPassword)) {
        this.arr.push("Не используйте более 2 повторяющихся символов подряд в пароле");
      }
    }

    if (this.arr.length > 0) {
      alert(this.arr.join("\n"));
      return;
    }

    addUserToLocalStorage({
      username: this.newLogin.trim(),
      password: this.newPassword.trim(),
      name: this.newName.trim()
    });

    alert("Пользователь успешно зарегистрирован!");
  }
}
