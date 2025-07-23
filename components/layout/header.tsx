"use client";

import { NotificationHeader } from "./notifacation";
import { UserHeader } from "./user";
import { useEffect, useState } from "react";
import { Alert } from "@mantine/core";
import { ThongTinBHXHWithNhanVienNgachLuongBacLuong } from "@/types/thong-tin-bhxh";
import { sendNotificationEmail } from "@/actions/thong-bao";

export function Header() {
  const [bhxhDenHans, setBhxhDenHans] = useState<
    ThongTinBHXHWithNhanVienNgachLuongBacLuong[]
  >([]);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    sendNotificationEmail().then((result) => {
      if (result) {
        setBhxhDenHans(result);
        setShowAlert(true);
      }
    });
  }, []);

  return (
    <>
      {showAlert && (
        <Alert
          title="Thông báo"
          color="red"
          onClose={() => setShowAlert(false)}
          withCloseButton
        >
          Có {bhxhDenHans.length} CBNV gần đến hạn nâng lương BHXH.
        </Alert>
      )}

      <div className="flex items-center gap-5 mr-5">
        <NotificationHeader data={bhxhDenHans} />
        <UserHeader />
      </div>
    </>
  );
}
