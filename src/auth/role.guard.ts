import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { Role } from 'src/types';

@Injectable()
export class RoleGuard implements CanActivate {

    private role: Role;
    private jwtService: JwtService = new JwtService()

    constructor(role: Role) { this.role = role }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

        const req = context.switchToHttp().getRequest()
        try {

            const header = req.headers.authorization.split` `
            const bearer = header[0]
            const token = header[1]

            if (bearer !== 'Bearer' || !token) {
                throw new UnauthorizedException({ message: 'Unauthorized user' })
            }

            const currentRole: Role = this.jwtService.decode(token).role

            if (currentRole === this.role || currentRole === "admin")
                return true

        } catch (error) {
            throw new UnauthorizedException({ message: 'Unauthorized user' })
        }
    }
}