import React from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { CheckCircle, XCircle, Trash2, MoreHorizontal } from 'lucide-react';

interface BulkActionsProps {
  selectedCount: number;
  selectedIds: number[];
  onAction: (action: 'activate' | 'deactivate' | 'delete', ids: number[]) => void;
}

export function BulkActions({ selectedCount, selectedIds, onAction }: BulkActionsProps) {
  if (selectedCount === 0) return null;

  return (
    <div className="flex items-center gap-2 p-2 bg-primary/10 rounded-lg border border-primary/20">
      <span className="text-sm font-medium text-primary">
        Đã chọn {selectedCount} mục
      </span>
      
      <div className="flex gap-1">
        <Button
          size="sm"
          variant="outline"
          onClick={() => onAction('activate', selectedIds)}
        >
          <CheckCircle className="w-4 h-4 mr-1" />
          Kích hoạt
        </Button>
        
        <Button
          size="sm"
          variant="outline"
          onClick={() => onAction('deactivate', selectedIds)}
        >
          <XCircle className="w-4 h-4 mr-1" />
          Vô hiệu hóa
        </Button>
        
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button size="sm" variant="outline">
              <Trash2 className="w-4 h-4 mr-1" />
              Xóa
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Xóa nội dung đã chọn?</AlertDialogTitle>
              <AlertDialogDescription>
                Bạn có chắc chắn muốn xóa {selectedCount} mục đã chọn? Hành động này không thể hoàn tác.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Hủy</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => onAction('delete', selectedIds)}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Xóa
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}