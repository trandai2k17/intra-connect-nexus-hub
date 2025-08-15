import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Edit, Trash2, Plus, Shield, Users, Key } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Permission {
  id: string;
  name: string;
  description: string;
  category: string;
}

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  isActive: boolean;
  createdDate: string;
}

interface User {
  id: string;
  username: string;
  fullName: string;
  email: string;
  department: string;
  roleId: string;
  isActive: boolean;
  lastLogin: string;
}

const mockPermissions: Permission[] = [
  { id: 'content_view', name: 'Xem Content', description: 'Có thể xem danh sách content', category: 'Content' },
  { id: 'content_create', name: 'Tạo Content', description: 'Có thể tạo content mới', category: 'Content' },
  { id: 'content_edit', name: 'Sửa Content', description: 'Có thể chỉnh sửa content', category: 'Content' },
  { id: 'content_delete', name: 'Xóa Content', description: 'Có thể xóa content', category: 'Content' },
  { id: 'user_view', name: 'Xem User', description: 'Có thể xem danh sách user', category: 'User Management' },
  { id: 'user_create', name: 'Tạo User', description: 'Có thể tạo user mới', category: 'User Management' },
  { id: 'user_edit', name: 'Sửa User', description: 'Có thể chỉnh sửa thông tin user', category: 'User Management' },
  { id: 'user_delete', name: 'Xóa User', description: 'Có thể xóa user', category: 'User Management' },
  { id: 'role_manage', name: 'Quản lý Role', description: 'Có thể quản lý các role và permission', category: 'System' },
  { id: 'system_config', name: 'Cấu hình hệ thống', description: 'Có thể thay đổi cấu hình hệ thống', category: 'System' },
];

const mockRoles: Role[] = [
  {
    id: '1',
    name: 'Super Admin',
    description: 'Toàn quyền hệ thống',
    permissions: mockPermissions.map(p => p.id),
    isActive: true,
    createdDate: '2024-01-01'
  },
  {
    id: '2', 
    name: 'Content Manager',
    description: 'Quản lý nội dung website',
    permissions: ['content_view', 'content_create', 'content_edit', 'content_delete'],
    isActive: true,
    createdDate: '2024-01-15'
  },
  {
    id: '3',
    name: 'User Manager',
    description: 'Quản lý người dùng',
    permissions: ['user_view', 'user_create', 'user_edit'],
    isActive: true,
    createdDate: '2024-01-20'
  },
  {
    id: '4',
    name: 'Viewer',
    description: 'Chỉ xem, không chỉnh sửa',
    permissions: ['content_view', 'user_view'],
    isActive: true,
    createdDate: '2024-02-01'
  }
];

const mockUsers: User[] = [
  {
    id: '1',
    username: 'admin',
    fullName: 'Administrator',
    email: 'admin@company.com',
    department: 'IT',
    roleId: '1',
    isActive: true,
    lastLogin: '2024-01-15 09:30:00'
  },
  {
    id: '2',
    username: 'content_user',
    fullName: 'Nguyễn Văn A',
    email: 'nva@company.com',
    department: 'Marketing',
    roleId: '2',
    isActive: true,
    lastLogin: '2024-01-14 16:45:00'
  },
  {
    id: '3',
    username: 'hr_manager',
    fullName: 'Trần Thị B',
    email: 'ttb@company.com',
    department: 'HR',
    roleId: '3',
    isActive: true,
    lastLogin: '2024-01-13 08:15:00'
  },
  {
    id: '4',
    username: 'viewer_user',
    fullName: 'Lê Văn C',
    email: 'lvc@company.com',
    department: 'Sales',
    roleId: '4',
    isActive: false,
    lastLogin: '2024-01-10 14:20:00'
  }
];

export default function UserPermissions() {
  const [activeTab, setActiveTab] = useState<'users' | 'roles'>('users');
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [roles, setRoles] = useState<Role[]>(mockRoles);
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [userFormData, setUserFormData] = useState<Partial<User>>({});
  const [roleFormData, setRoleFormData] = useState<Partial<Role>>({});
  const { toast } = useToast();

  const departments = ['IT', 'Marketing', 'HR', 'Sales', 'Finance', 'Operations'];

  const getRoleName = (roleId: string) => {
    return roles.find(role => role.id === roleId)?.name || 'Unknown';
  };

  const getPermissionsByCategory = () => {
    const categories: { [key: string]: Permission[] } = {};
    mockPermissions.forEach(permission => {
      if (!categories[permission.category]) {
        categories[permission.category] = [];
      }
      categories[permission.category].push(permission);
    });
    return categories;
  };

  // User Management
  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setUserFormData(user);
    setIsUserDialogOpen(true);
  };

  const handleAddUser = () => {
    setEditingUser(null);
    setUserFormData({
      username: '',
      fullName: '',
      email: '',
      department: departments[0],
      roleId: roles[0]?.id,
      isActive: true,
      lastLogin: ''
    });
    setIsUserDialogOpen(true);
  };

  const handleSaveUser = () => {
    if (!userFormData.username || !userFormData.fullName || !userFormData.email) {
      toast({
        title: "Lỗi",
        description: "Vui lòng điền đầy đủ thông tin bắt buộc",
        variant: "destructive"
      });
      return;
    }

    if (editingUser) {
      setUsers(prev => prev.map(user => 
        user.id === editingUser.id 
          ? { ...user, ...userFormData }
          : user
      ));
      toast({
        title: "Thành công",
        description: "Đã cập nhật thông tin user"
      });
    } else {
      const newUser: User = {
        id: (Math.max(...users.map(u => parseInt(u.id))) + 1).toString(),
        ...userFormData as User
      };
      setUsers(prev => [...prev, newUser]);
      toast({
        title: "Thành công",
        description: "Đã thêm user mới"
      });
    }

    setIsUserDialogOpen(false);
    setUserFormData({});
  };

  const handleDeleteUser = (id: string) => {
    setUsers(prev => prev.filter(user => user.id !== id));
    toast({
      title: "Thành công",
      description: "Đã xóa user"
    });
  };

  const toggleUserActive = (id: string) => {
    setUsers(prev => prev.map(user =>
      user.id === id 
        ? { ...user, isActive: !user.isActive }
        : user
    ));
  };

  // Role Management
  const handleEditRole = (role: Role) => {
    setEditingRole(role);
    setRoleFormData(role);
    setIsRoleDialogOpen(true);
  };

  const handleAddRole = () => {
    setEditingRole(null);
    setRoleFormData({
      name: '',
      description: '',
      permissions: [],
      isActive: true,
      createdDate: new Date().toISOString().split('T')[0]
    });
    setIsRoleDialogOpen(true);
  };

  const handleSaveRole = () => {
    if (!roleFormData.name || !roleFormData.description) {
      toast({
        title: "Lỗi",
        description: "Vui lòng điền đầy đủ thông tin role",
        variant: "destructive"
      });
      return;
    }

    if (editingRole) {
      setRoles(prev => prev.map(role => 
        role.id === editingRole.id 
          ? { ...role, ...roleFormData }
          : role
      ));
      toast({
        title: "Thành công",
        description: "Đã cập nhật role"
      });
    } else {
      const newRole: Role = {
        id: (Math.max(...roles.map(r => parseInt(r.id))) + 1).toString(),
        ...roleFormData as Role
      };
      setRoles(prev => [...prev, newRole]);
      toast({
        title: "Thành công",
        description: "Đã thêm role mới"
      });
    }

    setIsRoleDialogOpen(false);
    setRoleFormData({});
  };

  const handleDeleteRole = (id: string) => {
    // Check if role is being used by any user
    const isRoleInUse = users.some(user => user.roleId === id);
    if (isRoleInUse) {
      toast({
        title: "Không thể xóa",
        description: "Role này đang được sử dụng bởi người dùng",
        variant: "destructive"
      });
      return;
    }

    setRoles(prev => prev.filter(role => role.id !== id));
    toast({
      title: "Thành công",
      description: "Đã xóa role"
    });
  };

  const toggleRolePermission = (permissionId: string) => {
    const currentPermissions = roleFormData.permissions || [];
    const newPermissions = currentPermissions.includes(permissionId)
      ? currentPermissions.filter(id => id !== permissionId)
      : [...currentPermissions, permissionId];
    
    setRoleFormData({...roleFormData, permissions: newPermissions});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-accent/5">
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Phân quyền User</h1>
            <p className="text-muted-foreground">Quản lý người dùng và phân quyền truy cập</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-muted/50 p-1 rounded-lg w-fit">
          <Button
            variant={activeTab === 'users' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('users')}
            className="flex items-center gap-2"
          >
            <Users className="w-4 h-4" />
            Quản lý User
          </Button>
          <Button
            variant={activeTab === 'roles' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('roles')}
            className="flex items-center gap-2"
          >
            <Shield className="w-4 h-4" />
            Quản lý Role
          </Button>
        </div>

        {/* Users Tab */}
        {activeTab === 'users' && (
          <Card className="backdrop-blur-sm bg-card/90 border-border/50">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Danh sách User
                </CardTitle>
                
                <Dialog open={isUserDialogOpen} onOpenChange={setIsUserDialogOpen}>
                  <DialogTrigger asChild>
                    <Button onClick={handleAddUser} className="bg-primary hover:bg-primary/90">
                      <Plus className="w-4 h-4 mr-2" />
                      Thêm User
                    </Button>
                  </DialogTrigger>
                  
                  <DialogContent className="max-w-lg">
                    <DialogHeader>
                      <DialogTitle>
                        {editingUser ? 'Chỉnh sửa User' : 'Thêm User mới'}
                      </DialogTitle>
                    </DialogHeader>
                    
                    <div className="grid gap-4">
                      <div>
                        <Label htmlFor="username">Username *</Label>
                        <Input
                          id="username"
                          value={userFormData.username || ''}
                          onChange={(e) => setUserFormData({...userFormData, username: e.target.value})}
                          placeholder="Nhập username"
                        />
                      </div>

                      <div>
                        <Label htmlFor="fullName">Họ tên *</Label>
                        <Input
                          id="fullName"
                          value={userFormData.fullName || ''}
                          onChange={(e) => setUserFormData({...userFormData, fullName: e.target.value})}
                          placeholder="Nhập họ tên đầy đủ"
                        />
                      </div>

                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={userFormData.email || ''}
                          onChange={(e) => setUserFormData({...userFormData, email: e.target.value})}
                          placeholder="email@company.com"
                        />
                      </div>

                      <div>
                        <Label htmlFor="department">Phòng ban</Label>
                        <Select 
                          value={userFormData.department} 
                          onValueChange={(value) => setUserFormData({...userFormData, department: value})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn phòng ban" />
                          </SelectTrigger>
                          <SelectContent>
                            {departments.map(dept => (
                              <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="role">Role</Label>
                        <Select 
                          value={userFormData.roleId} 
                          onValueChange={(value) => setUserFormData({...userFormData, roleId: value})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn role" />
                          </SelectTrigger>
                          <SelectContent>
                            {roles.filter(role => role.isActive).map(role => (
                              <SelectItem key={role.id} value={role.id}>{role.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch
                          id="isActive"
                          checked={userFormData.isActive || false}
                          onCheckedChange={(checked) => setUserFormData({...userFormData, isActive: checked})}
                        />
                        <Label htmlFor="isActive">Kích hoạt tài khoản</Label>
                      </div>

                      <div className="flex justify-end space-x-2 pt-4">
                        <Button variant="outline" onClick={() => setIsUserDialogOpen(false)}>
                          Hủy
                        </Button>
                        <Button onClick={handleSaveUser}>
                          {editingUser ? 'Cập nhật' : 'Thêm mới'}
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Username</TableHead>
                      <TableHead>Họ tên</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phòng ban</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Trạng thái</TableHead>
                      <TableHead>Đăng nhập cuối</TableHead>
                      <TableHead>Thao tác</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.username}</TableCell>
                        <TableCell>{user.fullName}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.department}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{getRoleName(user.roleId)}</Badge>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleUserActive(user.id)}
                          >
                            <Badge variant={user.isActive ? "default" : "secondary"}>
                              {user.isActive ? 'Hoạt động' : 'Vô hiệu hóa'}
                            </Badge>
                          </Button>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {user.lastLogin}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditUser(user)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteUser(user.id)}
                              disabled={user.username === 'admin'}
                            >
                              <Trash2 className="w-4 h-4 text-destructive" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Roles Tab */}
        {activeTab === 'roles' && (
          <Card className="backdrop-blur-sm bg-card/90 border-border/50">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Danh sách Role
                </CardTitle>
                
                <Dialog open={isRoleDialogOpen} onOpenChange={setIsRoleDialogOpen}>
                  <DialogTrigger asChild>
                    <Button onClick={handleAddRole} className="bg-primary hover:bg-primary/90">
                      <Plus className="w-4 h-4 mr-2" />
                      Thêm Role
                    </Button>
                  </DialogTrigger>
                  
                  <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>
                        {editingRole ? 'Chỉnh sửa Role' : 'Thêm Role mới'}
                      </DialogTitle>
                    </DialogHeader>
                    
                    <div className="grid gap-6">
                      <div className="grid gap-4">
                        <div>
                          <Label htmlFor="roleName">Tên Role *</Label>
                          <Input
                            id="roleName"
                            value={roleFormData.name || ''}
                            onChange={(e) => setRoleFormData({...roleFormData, name: e.target.value})}
                            placeholder="Nhập tên role"
                          />
                        </div>

                        <div>
                          <Label htmlFor="roleDescription">Mô tả *</Label>
                          <Input
                            id="roleDescription"
                            value={roleFormData.description || ''}
                            onChange={(e) => setRoleFormData({...roleFormData, description: e.target.value})}
                            placeholder="Mô tả về role này"
                          />
                        </div>

                        <div className="flex items-center space-x-2">
                          <Switch
                            id="roleActive"
                            checked={roleFormData.isActive || false}
                            onCheckedChange={(checked) => setRoleFormData({...roleFormData, isActive: checked})}
                          />
                          <Label htmlFor="roleActive">Kích hoạt role</Label>
                        </div>
                      </div>

                      <div>
                        <Label className="text-base font-semibold flex items-center gap-2">
                          <Key className="w-4 h-4" />
                          Phân quyền
                        </Label>
                        <div className="mt-4 space-y-6">
                          {Object.entries(getPermissionsByCategory()).map(([category, permissions]) => (
                            <div key={category} className="space-y-3">
                              <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                                {category}
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-4 border-l-2 border-border">
                                {permissions.map((permission) => (
                                  <div key={permission.id} className="flex items-start space-x-3">
                                    <Checkbox
                                      id={permission.id}
                                      checked={(roleFormData.permissions || []).includes(permission.id)}
                                      onCheckedChange={() => toggleRolePermission(permission.id)}
                                    />
                                    <div className="grid gap-1.5 leading-none">
                                      <Label 
                                        htmlFor={permission.id}
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                      >
                                        {permission.name}
                                      </Label>
                                      <p className="text-xs text-muted-foreground">
                                        {permission.description}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-end space-x-2 pt-4 border-t">
                        <Button variant="outline" onClick={() => setIsRoleDialogOpen(false)}>
                          Hủy
                        </Button>
                        <Button onClick={handleSaveRole}>
                          {editingRole ? 'Cập nhật' : 'Thêm mới'}
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tên Role</TableHead>
                      <TableHead>Mô tả</TableHead>
                      <TableHead>Số quyền</TableHead>
                      <TableHead>Trạng thái</TableHead>
                      <TableHead>Ngày tạo</TableHead>
                      <TableHead>Thao tác</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {roles.map((role) => (
                      <TableRow key={role.id}>
                        <TableCell className="font-medium">{role.name}</TableCell>
                        <TableCell>{role.description}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">
                            {role.permissions.length} quyền
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={role.isActive ? "default" : "secondary"}>
                            {role.isActive ? 'Hoạt động' : 'Vô hiệu hóa'}
                          </Badge>
                        </TableCell>
                        <TableCell>{role.createdDate}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditRole(role)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteRole(role.id)}
                              disabled={role.name === 'Super Admin'}
                            >
                              <Trash2 className="w-4 h-4 text-destructive" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}