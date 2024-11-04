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
exports.FavoriteService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../../schemas/user.schema");
const favorite_schema_1 = require("../../schemas/favorite.schema");
const donation_schema_1 = require("../../schemas/donation.schema");
let FavoriteService = class FavoriteService {
    constructor(favoriteModel, donationModel, userModel) {
        this.favoriteModel = favoriteModel;
        this.donationModel = donationModel;
        this.userModel = userModel;
    }
    async create(userId, donationId) {
        const model = new favorite_schema_1.Favorite();
        const donation = await this.donationModel.findById(donationId).exec();
        if (!donation) {
            throw new common_1.NotFoundException(`A doação ${donationId} não está mais cadastrada `);
        }
        const user = await this.userModel.findById(userId).exec();
        if (!user) {
            throw new common_1.NotFoundException(`O usuário ${userId} não foi encontrado `);
        }
        model.donationId = donation.id;
        model.userId = user.id;
        return this.favoriteModel.create(model);
    }
    async getAllFavorites(userId) {
        const user = await this.favoriteModel.find({
            userId: userId,
        }).populate('donationId');
        return user;
    }
    async delete(userId, donationId) {
        const donation = await this.donationModel.findById(donationId).exec();
        if (!donation) {
            throw new common_1.NotFoundException(`A doação ${donationId} não está mais cadastrada `);
        }
        const user = await this.userModel.findById(userId).exec();
        if (!user) {
            throw new common_1.NotFoundException(`O usuário ${userId} não foi encontrado `);
        }
        await this.favoriteModel.findOneAndDelete({ userId: user.id, donationId: donation.id });
    }
};
exports.FavoriteService = FavoriteService;
exports.FavoriteService = FavoriteService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(favorite_schema_1.Favorite.name, 'main')),
    __param(1, (0, mongoose_1.InjectModel)(donation_schema_1.Donation.name, 'main')),
    __param(2, (0, mongoose_1.InjectModel)(user_schema_1.User.name, 'main')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], FavoriteService);
//# sourceMappingURL=favorite.service.js.map