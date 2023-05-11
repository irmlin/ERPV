import { YELLOW_CONTAINER_PATH, BLUE_CONTAINER_PATH, GRAY_CONTAINER_PATH, GREEN_CONTAINER_PATH } from "../assets/theme"

export const CLASSIFICATION_CODES_MAP = Object.freeze({
  0: "ALU41",
  1: "FE40",
  2: "GL",
  3: "LDPE",
  4: "OTHER07",
  5: "PAP",
  6: "PET01",
  7: "PP05",
  8: "PS06",
  9: "PVC03",
  10: "cpap81",
  11: "hdpe",
  12: "negative"
})

export const RECYCLING_GROUPS = Object.freeze({
  "YELLOW": {
    "CLASSES": [0, 1, 3, 4, 6, 7, 8, 9, 10, 11],
    "IMAGE": YELLOW_CONTAINER_PATH, 
  },
  "GREEN": {
    "CLASSES": [2],
    "IMAGE": GREEN_CONTAINER_PATH, 
  },
  "BLUE": {
    "CLASSES": [5],
    "IMAGE": BLUE_CONTAINER_PATH, 
  },
  "NONE": {
    "CLASSES": [12],
    "IMAGE": "",
  },
  "GRAY": {
    "CLASSES": [],
    "IMAGE": GRAY_CONTAINER_PATH, 
  }
})

export const SCANNER_STATES = Object.freeze({
  "SUCCESS_YELLOW": {
    "TEXT": "Šią pakuotę mesk į geltoną plastiko konteinerį!",
    "COLOR": "#57CC54"
  }, 
  "SUCCESS_GREEN": {
    "TEXT": "Šią pakuotę mesk į žalią stiklo konteinerį!",
    "COLOR": "#57CC54"
  }, 
  "SUCCESS_BLUE": {
    "TEXT": "Šią pakuotę mesk į mėlyną popieriaus konteinerį!",
    "COLOR": "#57CC54"
  }, 
  "SUCCESS_GRAY": {
    "TEXT": "Šią pakuotę mesk į bendrąjį konteinerį!",
    "COLOR": "#57CC54"
  }, 
  "ERROR": {
    "TEXT": "Atpažinti nepavyko\nPabandyk iš naujo",
    "COLOR": "#dc143c"
  }, 
  "IDLE": {
    "TEXT": "Nufotografuok\npakuotę",
    "COLOR": "#FAC643"
  }
})