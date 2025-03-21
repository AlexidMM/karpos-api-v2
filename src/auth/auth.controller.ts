//src/auth/auth.controller.ts
import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GetCurrentUser } from './decorators/get-current-user.decorator';
import { Public } from './decorators/public.decorator';
import { RefreshTokenGuard } from './guards/refresh-token.guard';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@GetCurrentUser('sub') userId: number) {
    return this.authService.logout(userId);
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refreshTokens(
    @GetCurrentUser('sub') userId: number,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ) {
    return this.authService.refreshTokens(userId, refreshToken);
  }

  @Public()
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }
  
  // Rutas para autenticación con Google
  @Public()
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    // Este método no hace nada, solo inicia el flujo de autenticación
  }

  @Public()
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    try {
      // El usuario ya está autenticado y disponible en req.user
      const user = req.user as any; // Usamos 'as any' para evitar errores de tipado

      if (!user) {
        return res.redirect('http://localhost:5173/login?error=auth_failed');
      }

      // Redirigir al frontend con los tokens como parámetros encriptados o en fragmento de URL
      // IMPORTANTE: Usar el fragmento (#) es más seguro para tokens que los query params
      return res.redirect(
        `http://localhost:5173/auth/google/success#accessToken=${encodeURIComponent(user.accessToken)}&refreshToken=${encodeURIComponent(user.refreshToken)}`
      );
    } catch (error) {
      console.error('Error en la redirección de Google:', error);
      return res.redirect('http://localhost:5173/login?error=auth_failed');
    }
  }
}