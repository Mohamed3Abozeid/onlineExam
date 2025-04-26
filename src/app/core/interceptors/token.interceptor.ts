import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const useTokenr = localStorage.getItem('token');
  if (useTokenr) {
    req = req.clone({
      setHeaders: {
        token: useTokenr,
      },
    });
  }
  return next(req);
};
