import {CanActivateFn, Router} from '@angular/router';

export const appGuardGuard: CanActivateFn =
  (route, state)=> {
  const user = localStorage.getItem('user')
  const router = new Router()
  if (user) {
    return true
  }
  else {
    router.navigate(["error403"]);
    return false
  }
}
