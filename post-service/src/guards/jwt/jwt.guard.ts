import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  private readonly logger = new Logger(JwtAuthGuard.name);

  // URL твого authentication-service (заміни на актуальний)
  private readonly authServiceUrl = 'http://localhost:3001/authentificattion/accessVerify';

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('No token provided');
    }

    const [bearer, token] = authHeader.split(' ');

    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException('Invalid token format');
    }

    
      // HTTP POST-запит до authentication-service
      const response = await axios.post(`${this.authServiceUrl}`, {
        token,
      });

      if (!response.data) {
        throw new UnauthorizedException('Invalid token');
      }

      return true;
//     } catch (err) {
//       this.logger.error(`Token verification failed for token: ${token}`, err);
// throw new UnauthorizedException(`Token verification failed for token: ${token}`, err );

//     }
  }
}
