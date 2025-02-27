"use client";

import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerClose } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

export default function BottomDrawer({ open, onClose, children }: { open: boolean; onClose: () => void; children: React.ReactNode }) {
  return (
    <Drawer open={open} onOpenChange={onClose}>
      <DrawerContent className="p-4 z-[1000]">
        <DrawerHeader>
          <DrawerTitle>Détails du lieu</DrawerTitle>
          <DrawerDescription>Informations sur l’utilisateur sélectionné</DrawerDescription>
        </DrawerHeader>
        <div className="p-4">{children}</div>
        <DrawerClose asChild>
          <Button variant="outline" className="w-full mt-4">
            Fermer
          </Button>
        </DrawerClose>
      </DrawerContent>
    </Drawer>
  );
}
