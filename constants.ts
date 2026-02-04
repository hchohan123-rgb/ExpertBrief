import { AppData, FolderMeta } from './types';

export const FOLDER_LIST: FolderMeta[] = [
  { id: '00-letter-of-instruction', name: '00 Letter of Instruction' },
  { id: '01-project-information', name: '01 Project Information' },
  { id: '02-contract-documents', name: '02 Contract Documents' },
  { id: '03-mep-drawings', name: '03 MEP Drawings' },
  { id: '04-correspondence', name: '04 Correspondence' },
  { id: '05-progress-reports', name: '05 Progress Reports' },
  { id: '06-technical-data', name: '06 Technical Data' },
];

export const STATIC_DATA: AppData = {
  folders: {
    "00-letter-of-instruction": [
      { "id": "loi-main", "name": "Riverside Exchange MEP LOI.pdf" }
    ],
    "01-project-information": [
      { "id": "overview", "name": "Project Overview.pdf" },
      { "id": "timeline", "name": "Construction Timeline.pdf" }
    ],
    "02-contract-documents": [
      { "id": "contract", "name": "Contract Agreement.pdf" },
      { "id": "specs", "name": "General Specifications.pdf" }
    ],
    "03-mep-drawings": [
      { "id": "ga", "name": "MEP-GA-Level-B1.pdf" },
      { "id": "schematic", "name": "HVAC-Schematic.png" }
    ],
    "04-correspondence": [
      { "id": "email1", "name": "Email — RFI Clarification.msg" },
      { "id": "email2", "name": "Email — Delay Notification.msg" }
    ],
    "05-progress-reports": [
      { "id": "pr1", "name": "Progress Report — Jan.pdf" },
      { "id": "pr2", "name": "Progress Report — Feb.pdf" }
    ],
    "06-technical-data": [
      { "id": "sub1", "name": "Submittal — Chillers.pdf" },
      { "id": "sub2", "name": "Fan Data Sheet.pdf" }
    ]
  }
};