var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
define(["require", "exports", "system_lib/Driver", "system_lib/Metadata"], function (require, exports, Driver_1, Meta) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PhilipsSICP = void 0;
    var PhilipsSICP = (function (_super) {
        __extends(PhilipsSICP, _super);
        function PhilipsSICP(socket) {
            var _this = _super.call(this, socket) || this;
            _this.socket = socket;
            _this.mCurrentInput = "BROWSER";
            _this.mPower = true;
            _this.mVolume = 50;
            socket.autoConnect(true);
            return _this;
        }
        PhilipsSICP_1 = PhilipsSICP;
        Object.defineProperty(PhilipsSICP.prototype, "power", {
            get: function () {
                return this.mPower;
            },
            set: function (on) {
                this.mPower = on;
                this.sendCommand(0x18, on ? 2 : 1);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PhilipsSICP.prototype, "currentInput", {
            get: function () {
                return this.mCurrentInput;
            },
            set: function (name) {
                var inputNumber = PhilipsSICP_1.nameToInput[name];
                if (inputNumber === undefined)
                    throw "Bad input name";
                this.sendCommand(0xAC, inputNumber, 9, 1, 0);
                this.mCurrentInput = name;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PhilipsSICP.prototype, "volume", {
            get: function () {
                return this.mVolume / 100;
            },
            set: function (value) {
                var devVol = Math.round(value * 100);
                if (devVol !== this.mVolume) {
                    this.mVolume = devVol;
                    if (this.mDefVolHoldoff)
                        this.mDefVolume = true;
                    else
                        this.sendVolume();
                }
            },
            enumerable: false,
            configurable: true
        });
        PhilipsSICP.prototype.sendVolume = function () {
            var _this = this;
            this.sendCommand(0x44, this.mVolume, this.mVolume);
            this.mDefVolHoldoff = wait(200);
            this.mDefVolHoldoff.then(function () {
                _this.mDefVolHoldoff = undefined;
                if (_this.mDefVolume) {
                    _this.mDefVolume = false;
                    _this.sendVolume();
                }
            });
        };
        PhilipsSICP.prototype.sendCommand = function () {
            var commandBytes = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                commandBytes[_i] = arguments[_i];
            }
            var fullCommand = [];
            fullCommand.push(0x00);
            fullCommand.push(0x01);
            fullCommand.push(0x00);
            fullCommand.splice.apply(fullCommand, __spreadArray([3, 0], commandBytes, false));
            fullCommand[0] = fullCommand.length + 1;
            this.addChecksum(fullCommand);
            this.socket.sendBytes(fullCommand);
        };
        PhilipsSICP.prototype.addChecksum = function (command) {
            var checksum = 0;
            for (var _i = 0, command_1 = command; _i < command_1.length; _i++) {
                var byte = command_1[_i];
                checksum ^= byte;
            }
            command.push(checksum);
            return command;
        };
        PhilipsSICP.prototype.logCommand = function (command) {
            var fullMessage = "";
            for (var _i = 0, command_2 = command; _i < command_2.length; _i++) {
                var byte = command_2[_i];
                fullMessage += byte.toString(16) + ' ';
            }
            console.log(fullMessage);
        };
        var PhilipsSICP_1;
        PhilipsSICP.nameToInput = {
            "VIDEO": 0x01,
            "S-VIDEO": 0x02,
            "COMPONENT": 0x03,
            "VGA": 0x05,
            "HDMI": 0x0D,
            "HDMI 1": 0x0D,
            "HDMI 2": 0x06,
            "HDMI 3": 0x0F,
            "DVI-D": 0x0E,
            "BROWSER": 0x10,
            "DISPLAY PORT": 0x0A,
            "DISPLAY PORT 1": 0x0A,
            "DISPLAY PORT 2": 0x07
        };
        __decorate([
            Meta.property("Display power"),
            __metadata("design:type", Boolean),
            __metadata("design:paramtypes", [Boolean])
        ], PhilipsSICP.prototype, "power", null);
        __decorate([
            Meta.property("Input to be displayed, by name"),
            __metadata("design:type", String),
            __metadata("design:paramtypes", [String])
        ], PhilipsSICP.prototype, "currentInput", null);
        __decorate([
            Meta.property("Audio volume"),
            Meta.min(0),
            Meta.max(1),
            __metadata("design:type", Number),
            __metadata("design:paramtypes", [Number])
        ], PhilipsSICP.prototype, "volume", null);
        PhilipsSICP = PhilipsSICP_1 = __decorate([
            Meta.driver('NetworkTCP', { port: 5000 }),
            __metadata("design:paramtypes", [Object])
        ], PhilipsSICP);
        return PhilipsSICP;
    }(Driver_1.Driver));
    exports.PhilipsSICP = PhilipsSICP;
});
