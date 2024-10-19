"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatController = void 0;
const common_1 = require("@nestjs/common");
const chat_service_1 = require("./chat/chat.service");
const mongoose_1 = require("mongoose");
let ChatController = class ChatController {
    constructor(chatService) {
        this.chatService = chatService;
    }
    async sendMessage(user1, user2, message) {
        if (!mongoose_1.Types.ObjectId.isValid(user1) || !mongoose_1.Types.ObjectId.isValid(user2)) {
            throw new common_1.BadRequestException('IDs de usuário inválidos');
        }
        const userIdFirst = new mongoose_1.Types.ObjectId(user1);
        const userIdSecond = new mongoose_1.Types.ObjectId(user2);
        return this.chatService.sendMessage(userIdFirst, userIdSecond, message);
    }
    async getMessages(user1, user2) {
        if (!mongoose_1.Types.ObjectId.isValid(user1) || !mongoose_1.Types.ObjectId.isValid(user2)) {
            throw new common_1.BadRequestException('IDs de usuário inválidos');
        }
        const userIdFirst = new mongoose_1.Types.ObjectId(user1);
        const userIdSecond = new mongoose_1.Types.ObjectId(user2);
        return this.chatService.GetMessage(userIdFirst, userIdSecond);
    }
};
exports.ChatController = ChatController;
__decorate([
    (0, common_1.Post)('send-message'),
    __param(0, (0, common_1.Body)('user1')),
    __param(1, (0, common_1.Body)('user2')),
    __param(2, (0, common_1.Body)('message')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "sendMessage", null);
__decorate([
    (0, common_1.Get)('get-messages'),
    __param(0, (0, common_1.Param)('user1')),
    __param(1, (0, common_1.Param)('user2')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "getMessages", null);
exports.ChatController = ChatController = __decorate([
    (0, common_1.Controller)('chat'),
    __metadata("design:paramtypes", [chat_service_1.ChatService])
], ChatController);
//# sourceMappingURL=chat.controller.js.map