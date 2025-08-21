import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ContentItem } from '@/types/content';
import { Edit, Copy, Trash2, Eye, MoreHorizontal, GripVertical, ArrowUpDown, Plus } from 'lucide-react';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

interface ContentTableProps {
  contents: ContentItem[];
  selectedItems: number[];
  onSelectionChange: (selectedIds: number[]) => void;
  onEdit: (content: ContentItem) => void;
  onDelete: (recId: number) => void;
  onDuplicate: (content: ContentItem) => void;
  onToggleActive: (recId: number) => void;
  onReorder: (newOrder: ContentItem[]) => void;
  isReorderMode: boolean;
  sortField: keyof ContentItem;
  sortDirection: 'asc' | 'desc';
  onSort: (field: keyof ContentItem, direction: 'asc' | 'desc') => void;
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

export function ContentTable({
  contents,
  selectedItems,
  onSelectionChange,
  onEdit,
  onDelete,
  onDuplicate,
  onToggleActive,
  onReorder,
  isReorderMode,
  sortField,
  sortDirection,
  onSort,
  currentPage,
  totalPages,
  pageSize,
  totalItems,
  onPageChange,
  onPageSizeChange
}: ContentTableProps) {
  const [draggedItem, setDraggedItem] = useState<ContentItem | null>(null);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      onSelectionChange(contents.map(item => item.recId));
    } else {
      onSelectionChange([]);
    }
  };

  const handleSelectItem = (recId: number, checked: boolean) => {
    if (checked) {
      onSelectionChange([...selectedItems, recId]);
    } else {
      onSelectionChange(selectedItems.filter(id => id !== recId));
    }
  };

  const handleSort = (field: keyof ContentItem) => {
    const newDirection = field === sortField && sortDirection === 'asc' ? 'desc' : 'asc';
    onSort(field, newDirection);
  };

  const getSortIcon = (field: keyof ContentItem) => {
    if (field !== sortField) return <ArrowUpDown className="w-4 h-4 opacity-30" />;
    return sortDirection === 'asc' ? '↑' : '↓';
  };

  const getContentTypeBadge = (type: string) => {
    const variants = {
      Header: 'default',
      Banner: 'secondary',
      Tile: 'outline'
    } as const;
    return (
      <Badge variant={variants[type as keyof typeof variants] || 'default'}>
        {type}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const colors = {
      High: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
      Normal: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      Low: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
    };
    return (
      <Badge className={colors[priority as keyof typeof colors] || colors.Normal}>
        {priority === 'High' ? 'Cao' : priority === 'Normal' ? 'Bình thường' : 'Thấp'}
      </Badge>
    );
  };

  const getStatusBadge = (isActive: boolean) => {
    return (
      <Badge variant="secondary" className={
        isActive 
          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
          : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
      }>
        {isActive ? 'ĐANG HIỂN THỊ' : 'TẠM ẨN'}
      </Badge>
    );
  };

  const formatDateRange = (startDate: Date, endDate?: Date) => {
    const start = format(startDate, 'dd/MM/yyyy', { locale: vi });
    if (endDate) {
      const end = format(endDate, 'dd/MM/yyyy', { locale: vi });
      return `${start} - ${end}`;
    }
    return `${start} - Luôn`;
  };

  const handleDragStart = (e: React.DragEvent, item: ContentItem) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetItem: ContentItem) => {
    e.preventDefault();
    if (!draggedItem || draggedItem.recId === targetItem.recId) return;

    const newOrder = [...contents];
    const draggedIndex = newOrder.findIndex(item => item.recId === draggedItem.recId);
    const targetIndex = newOrder.findIndex(item => item.recId === targetItem.recId);

    newOrder.splice(draggedIndex, 1);
    newOrder.splice(targetIndex, 0, draggedItem);

    onReorder(newOrder);
    setDraggedItem(null);
  };

  if (contents.length === 0) {
    return (
      <div className="border rounded-lg p-8 text-center">
        <div className="space-y-4">
          <div className="text-muted-foreground">
            <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium">Chưa có nội dung</h3>
            <p>Bấm "Thêm mới" để tạo nội dung đầu tiên</p>
          </div>
          <Button onClick={() => onEdit({} as ContentItem)}>
            <Plus className="w-4 h-4 mr-2" />
            Thêm nội dung đầu tiên
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedItems.length === contents.length}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              
              {isReorderMode && (
                <TableHead className="w-12">
                  <GripVertical className="w-4 h-4" />
                </TableHead>
              )}
              
              <TableHead 
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort('orderDisplay')}
              >
                <div className="flex items-center gap-2">
                  Thứ tự {getSortIcon('orderDisplay')}
                </div>
              </TableHead>
              
              <TableHead 
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort('title')}
              >
                <div className="flex items-center gap-2">
                  Tiêu đề {getSortIcon('title')}
                </div>
              </TableHead>
              
              <TableHead>Loại</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead>Thời gian</TableHead>
              <TableHead>Độ ưu tiên</TableHead>
              
              <TableHead 
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort('modifiedAt')}
              >
                <div className="flex items-center gap-2">
                  Cập nhật {getSortIcon('modifiedAt')}
                </div>
              </TableHead>
              
              <TableHead className="w-16">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          
          <TableBody>
            {contents.map((item) => (
              <TableRow
                key={item.recId}
                className={isReorderMode ? 'cursor-move' : ''}
                draggable={isReorderMode}
                onDragStart={(e) => handleDragStart(e, item)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, item)}
              >
                <TableCell>
                  <Checkbox
                    checked={selectedItems.includes(item.recId)}
                    onCheckedChange={(checked) => handleSelectItem(item.recId, !!checked)}
                  />
                </TableCell>
                
                {isReorderMode && (
                  <TableCell>
                    <GripVertical className="w-4 h-4 text-muted-foreground" />
                  </TableCell>
                )}
                
                <TableCell className="font-mono text-sm">
                  {item.orderDisplay}
                </TableCell>
                
                <TableCell className="max-w-xs">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <div className="truncate text-left">{item.title}</div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{item.title}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  {item.subContent && (
                    <div className="text-xs text-muted-foreground truncate mt-1">
                      {item.subContent}
                    </div>
                  )}
                </TableCell>
                
                <TableCell>
                  {getContentTypeBadge(item.contentType)}
                </TableCell>
                
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={item.isActive}
                      onCheckedChange={() => onToggleActive(item.recId)}
                    />
                    {getStatusBadge(item.isActive)}
                  </div>
                </TableCell>
                
                <TableCell className="text-sm">
                  {formatDateRange(item.startDate, item.endDate)}
                </TableCell>
                
                <TableCell>
                  {getPriorityBadge(item.priority)}
                </TableCell>
                
                <TableCell className="text-sm text-muted-foreground">
                  {format(item.modifiedAt, 'dd/MM HH:mm', { locale: vi })}
                </TableCell>
                
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onEdit(item)}>
                        <Edit className="w-4 h-4 mr-2" />
                        Sửa
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onDuplicate(item)}>
                        <Copy className="w-4 h-4 mr-2" />
                        Sao chép
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => window.open(`/content/view/${item.recId}`, '_blank')}>
                        <Eye className="w-4 h-4 mr-2" />
                        Xem
                      </DropdownMenuItem>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                            <Trash2 className="w-4 h-4 mr-2" />
                            Xóa
                          </DropdownMenuItem>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Xóa nội dung?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Bạn có chắc chắn muốn xóa "{item.title}"? Hành động này không thể hoàn tác.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Hủy</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => onDelete(item.recId)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Xóa
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-sm text-muted-foreground">
            Hiển thị {(currentPage - 1) * pageSize + 1}-{Math.min(currentPage * pageSize, totalItems)} 
            trong tổng số {totalItems} mục
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm">Hiển thị:</span>
            <Select value={pageSize.toString()} onValueChange={(value) => onPageSizeChange(Number(value))}>
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Trước
          </Button>
          
          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNum = currentPage <= 3 ? i + 1 : currentPage - 2 + i;
              if (pageNum > totalPages) return null;
              
              return (
                <Button
                  key={pageNum}
                  variant={pageNum === currentPage ? "default" : "outline"}
                  size="sm"
                  onClick={() => onPageChange(pageNum)}
                  className="w-8 h-8 p-0"
                >
                  {pageNum}
                </Button>
              );
            })}
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Sau
          </Button>
        </div>
      </div>
    </div>
  );
}

function FileText({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );
}