/*
 * Copyright (c) 2018 PIXILAB Technologies AB, Sweden (http://pixilab.se). All Rights Reserved.
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
define(["require", "exports", "system_lib/Driver", "system_lib/Metadata"], function (require, exports, Driver_1, Metadata_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**	Basic driver for sending keystrokes through a Global Caché iTach
        Ethernet IR sender.
    */
    var iTachIR = (function (_super) {
        __extends(iTachIR, _super);
        function iTachIR(socket) {
            var _this = _super.call(this, socket) || this;
            _this.socket = socket;
            socket.autoConnect();
            return _this;
        }
        iTachIR.prototype.sendKey = function (key) {
            var toSend = keyToCode[key];
            if (toSend)
                this.socket.sendText(toSend);
            else
                console.warn("Undefined key", key);
        };
        Object.defineProperty(iTachIR.prototype, "channel", {
            get: function () {
                return this.currChannel;
            },
            set: function (channel) {
                this.currChannel = channel;
                if (channel > 9)
                    this.sendKey(Math.floor(channel / 10).toString());
                this.sendKey((channel % 10).toString());
                this.sendKey("OK"); // Speeds up channel access somewhat
            },
            enumerable: true,
            configurable: true
        });
        return iTachIR;
    }(Driver_1.Driver));
    __decorate([
        Metadata_1.callable("Send a single key-press"),
        __param(0, Metadata_1.parameter("Key to send")),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], iTachIR.prototype, "sendKey", null);
    __decorate([
        Metadata_1.property("TV channel number"),
        Metadata_1.min(1), Metadata_1.max(99),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], iTachIR.prototype, "channel", null);
    iTachIR = __decorate([
        Metadata_1.driver('NetworkTCP', { port: 4998 }),
        __metadata("design:paramtypes", [Object])
    ], iTachIR);
    exports.iTachIR = iTachIR;
    // Key codes learnt from the TV box remote through the iTach box
    var keyToCode = {
        "0": "sendir,2:1,3,36337,1,1,70,55,30,9,10,9,10,9,10,9,20,9,10,19,20,19,10,9,10,9,10,9,10,9,10,9,10,9,20,19,10,9,10,9,10,9,20,9,10,19,10,9,20,9,10,9,10,9,10,9,10,19,10,9,20,2887,70,55,30,9,10,9,10,9,10,9,20,19,10,9,20,19,10,9,10,9,10,9,10,9,10,9,10,9,20,19,10,9,10,9,10,9,20,9,10,19,10,9,20,9,10,9,10,9,10,19,20,19,20,4651",
        "1": "sendir,2:1,4,36231,1,1,70,54,30,9,10,9,10,9,10,9,20,9,10,19,20,19,10,9,10,9,10,9,10,9,10,9,10,9,20,19,10,9,10,9,10,9,10,9,10,9,20,19,20,9,10,9,10,9,10,9,10,9,10,9,10,9,10,4637",
        "2": "sendir,2:1,5,36231,1,1,70,54,30,9,10,9,10,9,10,9,20,9,10,19,20,19,10,9,10,9,10,9,10,9,10,9,10,9,20,19,10,9,10,10,9,10,10,9,10,9,20,9,10,9,10,9,10,9,10,9,10,19,10,9,10,9,10,9,10,2874,70,54,30,9,10,9,10,9,10,9,20,19,10,9,20,19,10,9,10,9,10,9,10,9,10,9,10,9,20,19,10,9,10,9,10,9,10,9,10,10,20,9,10,9,10,9,10,9,10,9,10,9,10,9,10,19,10,9,10,4637",
        "3": "sendir,2:1,1,36337,1,1,70,55,30,9,10,9,10,9,10,9,20,19,10,9,20,19,10,9,10,9,10,9,10,9,10,9,10,9,20,19,10,9,10,9,10,9,10,9,20,19,10,9,20,9,10,9,10,9,10,9,10,9,10,19,20,4651",
        "4": "sendir,2:1,7,36337,1,1,70,55,30,9,10,9,10,9,10,9,20,9,10,19,20,19,10,9,10,9,10,9,10,9,10,9,10,9,20,19,10,9,10,9,10,9,10,9,20,19,20,9,10,9,10,9,10,9,10,19,10,9,20,19,10,2885,70,55,30,9,10,9,10,9,10,9,20,19,10,9,20,19,10,9,10,9,10,9,10,9,10,9,10,9,20,19,10,9,10,9,10,9,10,9,20,19,20,9,10,9,10,9,10,9,10,9,10,9,10,9,10,19,10,2883,70,54,30,9,10,9,10,9,10,9,20,19,10,9,20,19,10,9,10,9,10,9,10,9,10,10,10,9,20,19,10,9,10,9,10,9,10,9,20,19,20,9,10,9,10,9,10,9,10,9,10,9,10,9,10,19,10,4651",
        "5": "sendir,2:1,8,36337,1,1,70,55,30,9,10,9,10,9,10,9,20,9,10,19,20,19,10,9,10,9,10,9,10,9,10,9,10,9,20,19,10,9,10,9,10,9,10,9,20,9,10,19,20,9,10,9,10,9,10,19,10,9,20,9,10,2894,70,55,30,9,10,9,10,9,10,9,20,19,10,9,20,19,10,9,10,9,10,9,10,9,10,9,10,9,20,19,10,9,10,9,10,9,10,9,20,9,10,19,20,9,10,9,10,9,10,9,10,9,10,9,10,9,10,2883,70,54,30,9,10,9,10,9,10,9,20,19,10,9,20,19,10,9,10,9,10,9,10,9,10,9,10,9,20,19,10,9,10,9,10,9,10,9,20,9,10,19,20,9,10,9,10,9,10,9,10,9,10,9,10,9,10,2883,70,54,30,9,10,9,10,9,10,9,20,19,10,9,20,19,10,9,10,9,10,9,10,9,10,9,10,9,20,19,10,9,10,9,10,9,10,9,20,9,10,19,20,9,10,9,10,9,10,9,10,9,10,9,10,9,10,2883,70,54,30,9,10,9,10,9,10,9,20,19,10,9,20,19,10,9,10,9,10,9,10,9,10,9,10,9,20,19,10,9,10,9,10,9,10,9,20,9,10,19,20,9,10,9,10,9,10,9,10,9,10,9,10,9,10,4651",
        "6": "sendir,2:1,9,36337,1,1,70,55,30,9,10,9,10,9,10,9,20,9,10,19,20,19,10,9,10,9,10,9,10,9,10,9,10,9,20,19,10,9,10,9,10,9,10,9,20,9,10,9,10,9,10,9,10,9,10,9,10,19,20,19,10,9,10,2886,70,55,30,9,10,9,10,9,10,9,20,19,10,9,20,19,10,9,10,9,10,9,10,9,10,9,10,9,20,19,10,9,10,9,10,9,10,9,20,9,10,9,10,9,10,9,10,9,10,9,10,19,10,9,10,9,10,9,10,2884,70,54,30,9,10,9,10,9,10,9,20,19,10,9,20,19,10,9,10,9,10,9,10,9,10,9,10,9,20,19,10,9,10,9,10,9,10,9,20,9,10,9,10,9,10,9,10,9,10,9,10,19,10,9,10,9,10,9,10,2883,70,54,30,9,10,9,10,9,10,9,20,19,10,9,20,19,10,9,10,9,10,9,10,10,10,9,10,9,20,19,10,9,10,9,10,9,10,9,20,9,10,9,10,9,10,9,10,9,10,9,10,19,10,9,10,9,10,9,10,2884,70,54,30,9,10,9,10,9,10,9,20,19,10,9,20,19,10,9,10,9,10,9,10,9,10,9,10,9,20,19,10,9,10,9,10,9,10,9,20,9,10,9,10,9,10,9,10,9,10,9,10,19,10,9,10,9,10,9,10,4651",
        "7": "sendir,2:1,10,36337,1,1,70,55,30,9,10,9,10,9,10,9,20,9,10,19,20,19,10,9,10,9,10,9,10,9,10,9,10,9,20,19,10,9,10,9,10,9,20,19,10,9,10,9,20,9,10,9,10,9,10,19,20,19,20,2894,70,55,30,9,10,9,10,9,10,9,20,19,10,9,20,19,10,9,10,9,10,9,10,9,10,9,10,9,20,19,10,9,10,9,10,9,20,19,10,9,10,9,20,9,10,9,10,9,10,19,10,9,10,9,20,2883,70,54,30,9,10,9,10,9,10,9,20,19,10,9,20,19,10,9,10,9,10,9,10,9,10,9,10,9,20,19,10,9,10,9,10,9,20,19,10,9,10,10,19,10,10,9,10,9,10,19,10,9,10,9,20,2883,70,54,30,9,10,9,10,9,10,9,20,19,10,9,20,19,10,9,10,9,10,9,10,9,10,9,10,9,20,19,10,9,10,9,10,9,20,19,10,9,10,9,20,9,10,9,10,9,10,19,10,9,10,9,20,4651",
        "8": "sendir,2:1,11,36337,1,1,70,55,30,9,10,9,10,9,10,9,20,9,10,19,20,19,10,9,10,9,10,9,10,9,10,9,10,9,20,19,10,9,10,9,10,9,20,19,10,9,20,9,10,9,10,9,10,9,10,19,20,9,10,19,10,2882,70,55,30,9,10,9,10,9,10,9,20,19,10,9,20,19,10,9,10,9,10,9,10,9,10,9,10,9,20,19,10,9,10,9,10,9,20,19,10,9,20,9,10,9,10,9,10,9,10,19,10,9,20,19,10,2884,70,54,30,9,10,9,10,10,9,10,20,19,10,9,20,19,10,9,10,9,10,9,10,9,10,9,10,9,20,19,10,9,10,9,10,9,20,19,10,9,20,9,10,9,10,9,10,9,10,19,10,9,20,19,10,2884,70,54,30,9,10,9,10,9,10,9,20,19,10,9,20,19,10,9,10,9,10,9,10,9,10,9,10,9,20,19,10,9,10,10,9,10,20,19,10,9,20,9,10,9,10,9,10,9,10,19,10,9,20,19,10,4651",
        "9": "sendir,2:1,14,36337,1,1,70,55,30,9,10,9,10,9,10,9,20,9,10,19,20,19,10,9,10,9,10,9,10,9,10,9,10,9,20,19,10,9,10,9,10,9,20,19,20,19,20,9,10,9,10,9,10,19,20,9,10,9,10,2891,70,55,30,9,10,9,10,9,10,9,20,19,10,9,20,19,10,9,10,9,10,9,10,9,10,9,10,9,20,19,10,9,10,9,10,9,20,19,20,19,20,9,10,9,10,9,10,19,10,9,20,9,10,2884,70,54,30,9,10,9,10,9,10,9,20,19,10,9,20,19,10,9,10,9,10,9,10,9,10,9,10,9,20,19,10,9,10,9,10,9,20,19,20,19,20,9,10,9,10,9,10,19,10,9,20,9,10,4651",
        "OK": "sendir,2:1,3,36337,1,1,16,19,20,2899,70,55,30,9,10,9,10,9,10,9,20,19,10,9,20,19,10,9,10,9,10,9,10,9,10,9,10,9,20,19,10,9,10,9,20,19,20,9,10,9,10,9,10,9,10,9,10,9,10,19,10,9,10,9,20,4651"
    };
});
