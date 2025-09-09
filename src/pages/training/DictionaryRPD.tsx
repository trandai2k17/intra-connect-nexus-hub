import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { BookOpen, Search } from "lucide-react";
import { useState } from "react";

interface DictionaryTerm {
  term: string;
  definition: string;
  category: string;
  pronunciation?: string;
}

const rpdTerms: DictionaryTerm[] = [
  {
    term: "Setup",
    definition: "Quá trình thiết lập và chuẩn bị các thành phần ban đầu trong quy trình sản xuất RPD",
    category: "Process",
    pronunciation: "set-ʌp"
  },
  {
    term: "Festoon",
    definition: "Kỹ thuật tạo hình răng giả với đường viền tự nhiên và thẩm mỹ",
    category: "Technique"
  },
  {
    term: "Wax try-in",
    definition: "Giai đoạn thử nghiệm bằng sáp để kiểm tra độ vừa vặn và thẩm mỹ",
    category: "Process"
  },
  {
    term: "Flexible product",
    definition: "Sản phẩm răng giả có tính linh hoạt cao, thường được làm từ vật liệu polymer đặc biệt",
    category: "Material"
  },
  {
    term: "Cast Frame",
    definition: "Khung đúc kim loại làm nền cho răng giả tháo lắp",
    category: "Component"
  },
  {
    term: "Scan/Design",
    definition: "Quy trình quét 3D và thiết kế kỹ thuật số cho răng giả",
    category: "Technology"
  },
  {
    term: "Blockout",
    definition: "Kỹ thuật che chắn các vùng không mong muốn trong quá trình sản xuất",
    category: "Technique"
  },
  {
    term: "CT Scan",
    definition: "Chụp cắt lớp vi tính để phân tích cấu trúc răng và xương hàm",
    category: "Technology"
  }
];

const DictionaryRPD = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredTerms = rpdTerms.filter(term =>
    term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
    term.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
    term.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Process': return 'bg-blue-500/20 text-blue-700 dark:text-blue-300';
      case 'Technique': return 'bg-green-500/20 text-green-700 dark:text-green-300';
      case 'Material': return 'bg-purple-500/20 text-purple-700 dark:text-purple-300';
      case 'Component': return 'bg-orange-500/20 text-orange-700 dark:text-orange-300';
      case 'Technology': return 'bg-cyan-500/20 text-cyan-700 dark:text-cyan-300';
      default: return 'bg-gray-500/20 text-gray-700 dark:text-gray-300';
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
                  <CardTitle className="text-3xl font-bold text-blue-700 dark:text-blue-400 flex items-center gap-3">
                    <BookOpen className="h-8 w-8" />
                    RPD Dictionary
                    <Badge variant="secondary" className="ml-auto">
                      {rpdTerms.length} terms
                    </Badge>
                  </CardTitle>
                  <p className="text-muted-foreground">Từ điển chuyên ngành Removable Partial Denture</p>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Tìm kiếm thuật ngữ..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Terms Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTerms.map((term, index) => (
                  <Card key={index} className="border-white/20 dark:border-gray-700/20 shadow-lg bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl hover:shadow-xl transition-all duration-300 hover-scale">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg font-bold text-foreground">{term.term}</CardTitle>
                          {term.pronunciation && (
                            <p className="text-sm text-muted-foreground italic mt-1">/{term.pronunciation}/</p>
                          )}
                        </div>
                        <Badge className={getCategoryColor(term.category)}>
                          {term.category}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">{term.definition}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredTerms.length === 0 && (
                <Card className="border-white/20 dark:border-gray-700/20 shadow-lg bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl">
                  <CardContent className="text-center py-12">
                    <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Không tìm thấy thuật ngữ nào phù hợp.</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DictionaryRPD;