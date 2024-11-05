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
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const chat_schema_1 = require("../../schemas/chat.schema");
const user_schema_1 = require("../../schemas/user.schema");
let ChatService = class ChatService {
    constructor(chatModel, userModel) {
        this.chatModel = chatModel;
        this.userModel = userModel;
    }
    async sendMessage(user1, user2, message) {
        try {
            const chatItem = await this.chatModel.findOne({
                $or: [
                    { userIdFirst: user1, userIdSecond: user2 },
                    { userIdSecond: user1, userIdFirst: user2 },
                ],
            });
            if (!chatItem) {
                const newChat = new this.chatModel({
                    userIdFirst: user1,
                    userIdSecond: user2,
                    messages: [
                        {
                            userSend: user1,
                            ConteudoMessage: message,
                            Timespam: new Date(),
                        },
                    ],
                });
                return await newChat.save();
            }
            else {
                chatItem.messages.push({
                    userSend: user1,
                    ConteudoMessage: message,
                    Timespam: new Date(),
                });
                return await chatItem.save();
            }
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Erro ao criar da mensagem: ' + error.message);
        }
    }
    async getLastMessages(userId) {
        try {
            const chatItens = await this.chatModel.aggregate([
                {
                    $match: {
                        $or: [{ userIdFirst: userId }, { userIdSecond: userId }],
                    },
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'userIdFirst',
                        foreignField: 'ID',
                        as: 'userFirstDetails',
                    },
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'userIdSecond',
                        foreignField: 'ID',
                        as: 'userSecondDetails',
                    },
                },
                {
                    $unwind: '$userFirstDetails',
                },
                {
                    $unwind: '$userSecondDetails',
                },
                {
                    $sort: {
                        'messages.Timespam': -1,
                    },
                },
                {
                    $project: {
                        _id: 1,
                        userIdFirst: 1,
                        userIdSecond: 1,
                        messages: 1,
                        'userFirstDetails.nomeCompleto': 1,
                        'userFirstDetails.email': 1,
                        'userSecondDetails.nomeCompleto': 1,
                        'userSecondDetails.email': 1,
                    },
                },
            ]);
            if (!chatItens || chatItens.length === 0) {
                throw new common_1.NotFoundException(`Não existe mensagens trocadas entre esses usuários`);
            }
            if (!chatItens || chatItens.length === 0) {
                throw new common_1.NotFoundException(`Não existe mensagens trocadas entre esses usuários`);
            }
            return chatItens;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Chat error: ' + error.message);
        }
    }
};
exports.ChatService = ChatService;
exports.ChatService = ChatService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(chat_schema_1.Chat.name, 'main')),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.User.name, 'main')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], ChatService);
//# sourceMappingURL=chat.service.js.map