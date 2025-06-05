import { LocalStorageCharacter, LocalStorageInventory, LocalStorageKey } from "@/types/LocalStorage";
import { EquipSlot, AttributeType, ClassName, PetId, armour, ArmourId, hands, HandsId, heads, HeadId, weapons, WeaponId, shields, ShieldId, potions, PotionId, RingId, rings, waists, WaistId, Attributes, NeckId, necks, equips } from "@wholesome-sisters/auto-battler";
import Ajv, { JSONSchemaType } from "ajv";
import ajvErrors from "ajv-errors";
import { MAX_CHARACTERS } from "@/utils/constants";

const characterSchema: JSONSchemaType<LocalStorageCharacter> = {
    type: "object",
    properties: {
        name: { type: "string" },
        class: { type: "string", enum: Object.values(ClassName) },
        level: { type: "integer", minimum: 1, maximum: 20 },
        exp: { type: "integer", minimum: 0 },
        equipment: {
            type: "object",
            properties: {
                [EquipSlot.Armour]: {
                    type: "string",
                    enum: [...Object.keys(armour) as ArmourId[], null],
                    nullable: true as false,
                    errorMessage: {
                        enum: "Invalid Armour item id: ${/equipment/Armour}."
                    }
                },
                [EquipSlot.Hands]: {
                    type: "string",
                    enum: [...Object.keys(hands) as HandsId[], null],
                    nullable: true as false,
                    errorMessage: {
                        enum: "Invalid Hands item id: ${/equipment/Hands}."
                    }
                },
                [EquipSlot.Head]: {
                    type: "string",
                    enum: [...Object.keys(heads) as HeadId[], null],
                    nullable: true as false,
                    errorMessage: {
                        enum: "Invalid Head item id: ${/equipment/Armour}."
                    }
                },
                [EquipSlot.MainHand]: {
                    type: "string",
                    enum: [...Object.keys(weapons) as WeaponId[], null],
                    nullable: true as false,
                    errorMessage: {
                        enum: "Invalid Main Hand item id: ${/equipment/Armour}."
                    }
                },
                [EquipSlot.Neck]: {
                    type: "string",
                    enum: [...Object.keys(necks) as NeckId[], null],
                    nullable: true as false,
                    errorMessage: {
                        enum: "Invalid Neck item id: ${/equipment/Armour}."
                    }
                },
                [EquipSlot.OffHand]: {
                    type: "string",
                    enum: [...Object.keys(weapons) as WeaponId[], ...Object.keys(shields) as ShieldId[], null],
                    nullable: true as false,
                    errorMessage: {
                        enum: "Invalid Off Hand item id: ${/equipment/Armour}."
                    }
                },
                [EquipSlot.Potion]: {
                    type: "string",
                    enum: [...Object.keys(potions) as PotionId[], null],
                    nullable: true as false,
                    errorMessage: {
                        enum: "Invalid Potion item id: ${/equipment/Armour}."
                    }
                },
                [EquipSlot.Ring1]: {
                    type: "string",
                    enum: [...Object.keys(rings) as RingId[], null],
                    nullable: true as false,
                    errorMessage: {
                        enum: "Invalid Ring1 item id: ${/equipment/Armour}."
                    }
                },
                [EquipSlot.Ring2]: {
                    type: "string",
                    enum: [...Object.keys(rings) as RingId[], null],
                    nullable: true as false,
                    errorMessage: {
                        enum: "Invalid Ring2 item id: ${/equipment/Armour}."
                    }
                },
                [EquipSlot.Waist]: {
                    type: "string",
                    enum: [...Object.keys(waists) as WaistId[], null],
                    nullable: true as false,
                    errorMessage: {
                        enum: "Invalid Waist item id: ${/equipment/Armour}."
                    }
                }
            },
            required: [
                EquipSlot.Armour,
                EquipSlot.Hands,
                EquipSlot.Head,
                EquipSlot.MainHand,
                EquipSlot.Neck,
                EquipSlot.OffHand,
                EquipSlot.Potion,
                EquipSlot.Ring1,
                EquipSlot.Ring2,
                EquipSlot.Waist
            ],
            additionalProperties: false
        },
        attributes: {
            type: "object",
            properties: {
                [AttributeType.Strength]: { type: "integer", minimum: Attributes.MIN_VALUE },
                [AttributeType.Dexterity]: { type: "integer", minimum: Attributes.MIN_VALUE },
                [AttributeType.Perception]: { type: "integer", minimum: Attributes.MIN_VALUE },
                [AttributeType.Constitution]: { type: "integer", minimum: Attributes.MIN_VALUE },
                [AttributeType.Intelligence]: { type: "integer", minimum: Attributes.MIN_VALUE },
                [AttributeType.Wisdom]: { type: "integer", minimum: Attributes.MIN_VALUE }
            },
            required: [
                AttributeType.Strength,
                AttributeType.Dexterity,
                AttributeType.Perception,
                AttributeType.Constitution,
                AttributeType.Intelligence,
                AttributeType.Wisdom
            ],
            additionalProperties: false,
            errorMessage: {
                properties: {
                    [AttributeType.Strength]: `Strength must be ${Attributes.MIN_VALUE} or greater.`,
                    [AttributeType.Dexterity]: `Dexterity must be ${Attributes.MIN_VALUE} or greater.`,
                    [AttributeType.Perception]: `Perception must be ${Attributes.MIN_VALUE} or greater.`,
                    [AttributeType.Constitution]: `Constitution must be ${Attributes.MIN_VALUE} or greater.`,
                    [AttributeType.Intelligence]: `Intelligence must be ${Attributes.MIN_VALUE} or greater.`,
                    [AttributeType.Wisdom]: `Wisdom must be ${Attributes.MIN_VALUE} or greater.`
                },
                required: {
                    [AttributeType.Strength]: "Strength attribute is required.",
                    [AttributeType.Dexterity]: "Dexterity attribute is required.",
                    [AttributeType.Perception]: "Perception attribute is required.",
                    [AttributeType.Constitution]: "Constitution attribute is required.",
                    [AttributeType.Intelligence]: "Intelligence attribute is required.",
                    [AttributeType.Wisdom]: "Wisdom attribute is required."
                }
            },
        },
        pet: {
            type: "string",
            enum: [...Object.values(PetId), null],
            nullable: true as false
        },
        talents: {
            type: "object",
            additionalProperties: { type: "integer" },
            required: []
        }
    },
    required: [
        "name",
        "class",
        "level",
        "exp",
        "equipment",
        "attributes",
        "pet",
        "talents"
    ],
    additionalProperties: false,
    errorMessage: {
        properties: {
            name: "Character name is required.",
            class: "Invalid class.",
            level: "Level must be between 1 and 20.",
            exp: "Experience points must be a non-negative integer.",
            equipment: "Invalid equipment data.",
            attributes: "Invalid attributes data.",
            pet: "Invalid pet ID.",
            talents: "Invalid talents data."
        }
    }
};

const accountSchema: JSONSchemaType<{ characters: LocalStorageCharacter[], inventory: LocalStorageInventory; }> = {
    type: "object",
    properties: {
        [LocalStorageKey.Characters]: {
            type: "array",
            items: characterSchema,
            maxItems: MAX_CHARACTERS,
            errorMessage: {
                maxItems: `You can only have a maximum of ${MAX_CHARACTERS} characters.`
            }
        },
        [LocalStorageKey.Inventory]: {
            type: "array",
            items: {
                type: "string",
                nullable: true,
                enum: [...Object.keys(equips), null],
                errorMessage: {
                    enum: "Inventory contains an invalid item id."
                }
            },
        }
    },
    required: ["characters", "inventory"],
    additionalProperties: false,
    errorMessage: {
        properties: {
            [LocalStorageKey.Characters]: "Invalid characters data.",
            [LocalStorageKey.Inventory]: "Invalid inventory data."
        }
    }
};

const ajv = new Ajv({ allErrors: true });
ajvErrors(ajv);

const validateCharacter = ajv.compile<LocalStorageCharacter>(characterSchema);
const validateAccount = ajv.compile<{ characters: LocalStorageCharacter[], inventory: LocalStorageInventory; }>(accountSchema);

export { validateCharacter, validateAccount };