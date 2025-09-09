import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Star, Award, Calendar } from "lucide-react";

interface ThankEntry {
  id: string;
  sender: string;
  receiver: string;
  department: string;
  message: string;
  date: string;
  category: 'Recognition' | 'Achievement' | 'Teamwork' | 'Innovation';
}

const thankEntries: ThankEntry[] = [
  {
    id: "TH001",
    sender: "Nguyễn Văn Manager",
    receiver: "Trần Thị A",
    department: "Digital Design",
    message: "Cảm ơn A đã hỗ trợ team hoàn thành dự án RPD Framework setup trước deadline. Sự tận tâm và kỹ năng chuyên môn của A đã giúp team vượt qua nhiều khó khăn.",
    date: "15-Dec-24",
    category: "Achievement"
  },
  {
    id: "TH002", 
    sender: "Lê Văn B",
    receiver: "Phạm Thị C", 
    department: "CAD/CAM",
    message: "Tri ân C đã chia sẻ kinh nghiệm về 3D modeling và luôn sẵn sàng hỗ trợ đồng nghiệp. Tinh thần đồng đội của C rất đáng học hỏi.",
    date: "14-Dec-24",
    category: "Teamwork"
  },
  {
    id: "TH003",
    sender: "Hoàng Thị D",
    receiver: "Võ Văn E",
    department: "Quality Control", 
    message: "Ghi nhận E đã đề xuất quy trình kiểm tra CT Scan mới, giúp tăng độ chính xác lên 15%. Đây là một đóng góp rất có giá trị cho phòng ban.",
    date: "13-Dec-24",
    category: "Innovation"
  },
  {
    id: "TH004",
    sender: "Đặng Văn F",
    receiver: "Bùi Thị G",
    department: "Production",
    message: "Cảm ơn G đã làm việc tăng ca để hỗ trợ rush order trong tuần vừa qua. Sự cam kết và trách nhiệm của G với công việc thật đáng ngưỡng mộ.",
    date: "12-Dec-24", 
    category: "Recognition"
  },
  {
    id: "TH005",
    sender: "Ngô Thị H",
    receiver: "Trương Văn I",
    department: "Digital Design",
    message: "Tri ân I đã mentoring cho nhân viên mới và chia sẻ kiến thức về Blockout techniques. Khả năng truyền đạt của I rất xuất sắc.",
    date: "11-Dec-24",
    category: "Teamwork"
  },
  {
    id: "TH006",
    sender: "Mai Văn K",
    receiver: "Lý Thị L",
    department: "Training",
    message: "Ghi nhận L đã thiết kế và thực hiện thành công chương trình đào tạo Flexible Materials. Feedback từ học viên đều rất tích cực.",
    date: "10-Dec-24",
    category: "Achievement"
  }
];

const ThankCorner = () => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Recognition': return 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-300 border-yellow-500/30';
      case 'Achievement': return 'bg-green-500/20 text-green-700 dark:text-green-300 border-green-500/30';
      case 'Teamwork': return 'bg-blue-500/20 text-blue-700 dark:text-blue-300 border-blue-500/30';
      case 'Innovation': return 'bg-purple-500/20 text-purple-700 dark:text-purple-300 border-purple-500/30';
      default: return 'bg-gray-500/20 text-gray-700 dark:text-gray-300 border-gray-500/30';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Recognition': return Star;
      case 'Achievement': return Award;
      case 'Teamwork': return Heart;
      case 'Innovation': return Star;
      default: return Heart;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full gradient-bg dark:bg-gray-900">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 gradient-bg dark:bg-gray-900">
            <div className="container mx-auto px-6 py-8 space-y-8">
              {/* Header */}
              <Card className="border-white/20 dark:border-gray-700/20 shadow-2xl bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="text-3xl font-bold text-pink-700 dark:text-pink-400 flex items-center gap-3">
                    <Heart className="h-8 w-8" />
                    Thank Corner
                    <Badge variant="secondary" className="ml-auto">
                      {thankEntries.length} messages
                    </Badge>
                  </CardTitle>
                  <p className="text-muted-foreground">Góc tri ân - Nơi ghi nhận và chia sẻ những đóng góp tích cực</p>
                </CardHeader>
              </Card>

              {/* Statistics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                {['Recognition', 'Achievement', 'Teamwork', 'Innovation'].map((category) => {
                  const count = thankEntries.filter(entry => entry.category === category).length;
                  const Icon = getCategoryIcon(category);
                  return (
                    <Card key={category} className="border-white/20 dark:border-gray-700/20 shadow-lg bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl">
                      <CardContent className="p-4 text-center">
                        <Icon className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                        <p className="font-semibold text-2xl text-foreground">{count}</p>
                        <p className="text-sm text-muted-foreground">{category}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Thank Messages */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {thankEntries.map((entry) => {
                  const Icon = getCategoryIcon(entry.category);
                  return (
                    <Card key={entry.id} className="border-white/20 dark:border-gray-700/20 shadow-lg bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl hover:shadow-xl transition-all duration-300">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Icon className="h-5 w-5 text-muted-foreground" />
                              <Badge className={getCategoryColor(entry.category)}>
                                {entry.category}
                              </Badge>
                            </div>
                            <CardTitle className="text-lg font-bold text-foreground">
                              Gửi đến: {entry.receiver}
                            </CardTitle>
                            <p className="text-sm text-muted-foreground">
                              Từ: {entry.sender} • {entry.department}
                            </p>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            {entry.date}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground leading-relaxed italic">
                          "{entry.message}"
                        </p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Add New Thank Message Button */}
              <Card className="border-white/20 dark:border-gray-700/20 shadow-lg bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl">
                <CardContent className="text-center py-8">
                  <Heart className="h-12 w-12 text-pink-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">Chia sẻ lời tri ân của bạn</h3>
                  <p className="text-muted-foreground mb-4">Hãy dành thời gian để ghi nhận những đóng góp tích cực của đồng nghiệp</p>
                  <button className="bg-pink-500 hover:bg-pink-600 text-white py-2 px-6 rounded-lg transition-colors font-medium">
                    Viết lời tri ân
                  </button>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default ThankCorner;