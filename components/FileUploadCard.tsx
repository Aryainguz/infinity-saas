"use client";
import React, { useContext } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Workbook } from "exceljs";
import { emailsContext } from "@/context/emailsContext";

const FileUploadCard = () => {
  const [file, setFile] = React.useState<File | null>(null);

  const [emails, setEmails] = React.useState<string[]>([]);
  const [emailColumnNumber, setEmailColumnNumber] = React.useState<number>(1);

  const { setEmailsData } = useContext(emailsContext);

  const convertExcelToJson = (file: File) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const data = e.target?.result;
      if (data) {
        const workbook = new Workbook();
        await workbook.xlsx.load(Buffer.from(data as ArrayBuffer));
        const worksheet = workbook.getWorksheet(1);
        const emails: string[] = [];

        if (worksheet) {
          worksheet.eachRow((row, rowNumber) => {
            if (rowNumber > 1) {
              const email = row.getCell(emailColumnNumber).value;
              if (email) {
                emails.push(email.toString());
              }
            }
          });
        }

        setEmails(emails);
        setEmailsData(emails);
        localStorage.setItem("emails", JSON.stringify(emails));
      }
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <>
      <Card className="bg-white dark:bg-neutral-800">
        <CardHeader>
          <CardTitle>Upload Emails Sheet</CardTitle>
          <CardDescription>Upload emails excel sheet to your dashboard.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <Input
              type="file"
              className="w-full bg-gray-50 dark:bg-neutral-900"
              required
              aria-required
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setFile(file);
                }
              }}
            />

            <Input
              type="text"
              className="w-full bg-gray-50 dark:bg-neutral-900"
              placeholder="Enter Email Column Number"
              required
              onChange={(e) => {
                const value = e.target.value;
                setEmailColumnNumber(parseInt(value));
              }}
            />

            <Button
              className="w-full"
              onClick={() => {
                if (file) {
                  convertExcelToJson(file);
                }
              }}
            >
              Upload File
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default FileUploadCard;
