import type { Request, Response, NextFunction } from "express";
import { AuthService } from "../auth/auth.service.js";
import { UserRepository } from "../users/user.repository.js";
import type { AuthRequest } from "./auth.middleware.js";

export class AuthController {
  private readonly authService: AuthService;
  private readonly userRepository: UserRepository;
  constructor() {
    this.authService = new AuthService();
    this.userRepository = new UserRepository();
  }

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.authService.register(req.body);

      return res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  };

  login = async (req: Request, res: Response) => {
    try {
      console.log("Login request body:", req.body); // Log the incoming request body
      const result = await this.authService.login(req.body);

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      res.status(401).json({
        success: false,
        message: error.message,
      });
    }
  };

  me = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const user = await this.userRepository.findById(req.user!.userId);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      return res.status(200).json({
        success: true,
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (error) {
      next(error);
    }
  };
}
