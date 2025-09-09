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

const ngTerms: DictionaryTerm[] = [
  {
    term: "Impression",
    definition: "Bản lấy dấu răng của bệnh nhân để tạo mô hình làm việc",
    category: "Process",
    pronunciation: "ɪmˈpreʃən"
  },
  {
    term: "Articulation",
    definition: "Quá trình gắn răng vào khay để tạo ra hàm răng hoàn chỉnh",
    category: "Technique"
  },
  {
    term: "Occlusion",
    definition: "Sự khớp cắn giữa hàm trên và hàm dưới",
    category: "Anatomy"
  },
  {
    term: "Retention",
    definition: "Khả năng giữ cố định của răng giả trong miệng",
    category: "Function"
  },
  {
    term: "Stability",
    definition: "Tính ổn định của răng giả khi thực hiện các chức năng",
    category: "Function"
  },
  {
    term: "Aesthetics",
    definition: "Tính thẩm mỹ và sự hài hòa của răng giả với khuôn mặt",
    category: "Design"
  },
  {
    term: "Vertical Dimension",
    definition: "Kích thước thẳng đứng của khuôn mặt khi hàm khép lại",
    category: "Measurement"
  },
  {
    term: "Border Molding",
    definition: "Quá trình tạo hình viền để tối ưu hóa sự ôm sát",
    category: "Technique"
  }
];

const DictionaryNG = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredTerms = ngTerms.filter(term =>
    term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
    term.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
    term.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Process': return 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300';
      case 'Technique': return 'bg-blue-500/20 text-blue-700 dark:text-blue-300';
      case 'Anatomy': return 'bg-red-500/20 text-red-700 dark:text-red-300';
      case 'Function': return 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-300';
      case 'Design': return 'bg-purple-500/20 text-purple-700 dark:text-purple-300';
      case 'Measurement': return 'bg-cyan-500/20 text-cyan-700 dark:text-cyan-300';
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
                  <CardTitle className="text-3xl font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-3">
                    <BookOpen className="h-8 w-8" />
                    NG Dictionary
                    <Badge variant="secondary" className="ml-auto">
                      {ngTerms.length} terms
                    </Badge>
                  </CardTitle>
                  <p className="text-muted-foreground">Từ điển chuyên ngành Complete Denture (Răng giả toàn hàm)</p>
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

export default DictionaryNG;