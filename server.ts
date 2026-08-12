import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Helper function to initialize Gemini AI safely
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn('GEMINI_API_KEY is missing from process.env');
  }
  return new GoogleGenAI({
    apiKey: apiKey || '',
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// ----------------------------------------------------
// API ROUTES FOR AI SCHOOL ASSISTANT
// ----------------------------------------------------

// 1. AI Chatbot API
app.post('/api/ai/chat', async (req, res) => {
  try {
    const { messages, systemInstruction } = req.body;
    const ai = getGeminiClient();

    const formattedContents = (messages || []).map((msg: { sender: string; content: string }) => ({
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }],
    }));

    const systemPrompt =
      systemInstruction ||
      'Bạn là Trợ lý AI Giáo Dục Chuyên Nghiệp dành cho Cổng Trường THCS Việt Nam. Hãy trả lời ngắn gọn, chuẩn xác, chu đáo, chuẩn văn phong sư phạm Việt Nam, sử dụng markdown để trình bày đẹp mắt.';

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: formattedContents.length > 0 ? formattedContents : [{ role: 'user', parts: [{ text: 'Xin chào Trợ lý AI!' }] }],
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
      },
    });

    return res.json({ text: response.text || 'Không nhận được phản hồi từ AI.' });
  } catch (error: any) {
    console.error('Error in /api/ai/chat:', error);
    return res.status(500).json({ error: error.message || 'Lỗi kết nối Gemini API.' });
  }
});

// 2. AI Lesson Plan Generator (Giáo án CV 5512)
app.post('/api/ai/lesson-plan', async (req, res) => {
  try {
    const { subject, grade, lessonTitle, duration, targetCompetencies, extraNotes } = req.body;
    const ai = getGeminiClient();

    const prompt = `Bạn là chuyên gia thiết kế chương trình giáo dục THCS Việt Nam.
Hãy soạn một KẾ HOẠCH BÀI DẠY (GIÁO ÁN) hoàn chỉnh chuẩn Công văn 5512/BGDĐT cho:
- Môn học: ${subject || 'Công nghệ'}
- Khối lớp: ${grade || '9'}
- Tên bài học: ${lessonTitle || 'Ứng dụng Tin học trong Quản lý'}
- Thời lượng: ${duration || '2'} tiết
- Định hướng năng lực: ${targetCompetencies || 'Năng lực tự học, năng lực giải quyết vấn đề và sáng tạo, năng lực công nghệ.'}
${extraNotes ? `- Yêu cầu thêm: ${extraNotes}` : ''}

Hãy cấu trúc chi tiết theo đúng khung CV 5512:
I. MỤC TIÊU (1. Kiến thức; 2. Năng lực; 3. Phẩm chất)
II. THIẾT BỊ DẠY HỌC VÀ HỌC LIỆU (1. Giáo viên; 2. Học sinh)
III. TIẾN TRÌNH DẠY HỌC:
  - Hoạt động 1: Mở đầu / Khởi động
  - Hoạt động 2: Hình thành kiến thức mới
  - Hoạt động 3: Luyện tập
  - Hoạt động 4: Vận dụng
IV. HƯỚNG DẪN VỀ NHÀ & DẶN DÒ

Yêu cầu: Dùng markdown, chia bảng hoặc định dạng rõ ràng, văn phong sư phạm chuẩn mực.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        temperature: 0.6,
      },
    });

    return res.json({ result: response.text || '' });
  } catch (error: any) {
    console.error('Error in /api/ai/lesson-plan:', error);
    return res.status(500).json({ error: error.message || 'Lỗi khởi tạo giáo án.' });
  }
});

// 3. AI Exam & Quiz Generator (Đề thi & Ma trận)
app.post('/api/ai/exam-quiz', async (req, res) => {
  try {
    const { subject, grade, topic, duration, mcqCount, essayCount, bloomRatio } = req.body;
    const ai = getGeminiClient();

    const prompt = `Bạn là Trợ lý Khảo thí & Đánh giá Giáo dục THCS.
Hãy tạo trọn bộ ĐỀ KIỂM TRA ĐỊNH KỲ cho:
- Môn: ${subject || 'Toán học'} - Khối: ${grade || '9'}
- Chủ đề/Bài kiểm tra: ${topic || 'Ôn tập Phương trình bậc hai & Vi-ét'}
- Thời gian làm bài: ${duration || '45'} phút
- Số câu trắc nghiệm (TN): ${mcqCount || 8} câu (4 lựa chọn A, B, C, D)
- Số câu tự luận (TL): ${essayCount || 2} câu
- Tỷ lệ mức độ nhận thức: ${bloomRatio || '40% Nhận biết - 30% Thông hiểu - 20% Vận dụng - 10% Vận dụng cao'}

Bao gồm 4 phần rõ ràng:
PHẦN 1: MA TRẬN ĐỀ KIỂM TRA (Dạng bảng Markdown)
PHẦN 2: BẢN ĐẶC TẢ ĐỀ KIỂM TRA
PHẦN 3: ĐỀ BÀI CHÍNH THỨC (Có trắc nghiệm và tự luận)
PHẦN 4: ĐÁP ÁN VÀ HƯỚNG DẪN CHẤM CHI TIẾT (Có bảng quy đổi điểm & đáp án câu TN, lời giải chi tiết cho TL).`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        temperature: 0.5,
      },
    });

    return res.json({ result: response.text || '' });
  } catch (error: any) {
    console.error('Error in /api/ai/exam-quiz:', error);
    return res.status(500).json({ error: error.message || 'Lỗi tạo đề kiểm tra.' });
  }
});

// 4. AI Worksheet Creator (Phiếu học tập)
app.post('/api/ai/worksheet', async (req, res) => {
  try {
    const { subject, grade, topic, worksheetType } = req.body;
    const ai = getGeminiClient();

    const prompt = `Tạo một PHIẾU HỌC TẬP (WORKSHEET) sinh động cho học sinh THCS:
- Môn: ${subject || 'Ngữ văn'} - Lớp: ${grade || '9'}
- Chủ đề: ${topic || 'Nghị luận xã hội về ý chí vươn lên'}
- Dạng phiếu: ${worksheetType || 'Sơ đồ tư duy & Điền khuyết'}

Cấu trúc Phiếu Học Tập gồm:
1. Thông tin cá nhân học sinh (Họ tên, Lớp, Ngày)
2. Phần I: Khởi động - Điền từ khuyết / Ghép nối kiến thức
3. Phần II: Khám phá - Sơ đồ tư duy / Bảng so sánh phân tích
4. Phần III: Thử thách vận dụng thực tế
5. Ô tự đánh giá của học sinh & Lời nhắn của Thầy/Cô.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
    });

    return res.json({ result: response.text || '' });
  } catch (error: any) {
    console.error('Error in /api/ai/worksheet:', error);
    return res.status(500).json({ error: error.message || 'Lỗi tạo phiếu học tập.' });
  }
});

// 5. AI PowerPoint Outline Generator
app.post('/api/ai/ppt-outline', async (req, res) => {
  try {
    const { subject, grade, lessonTitle, slideCount } = req.body;
    const ai = getGeminiClient();

    const prompt = `Hãy thiết kế DÀN Ý SLIDE POWERPOINT BÀI GIẢNG DẠY HỌC THCS:
- Môn: ${subject || 'Vật lý'} - Lớp: ${grade || '9'}
- Bài giảng: ${lessonTitle || 'Hiện tượng Khúc xạ Ánh sáng'}
- Số lượng slide dự kiến: ${slideCount || 10} slide

Dành cho mỗi Slide:
- Tiêu đề Slide
- Nội dung gạch đầu dòng ngắn gọn (Highlight từ khóa)
- Gợi ý Hình ảnh / Video / Sơ đồ minh họa cần chèn
- Gợi ý hiệu ứng chuyển trang / Minigame tương tác trực tiếp với học sinh.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
    });

    return res.json({ result: response.text || '' });
  } catch (error: any) {
    console.error('Error in /api/ai/ppt-outline:', error);
    return res.status(500).json({ error: error.message || 'Lỗi tạo dàn ý PPT.' });
  }
});

// 6. AI Educational Games Generator
app.post('/api/ai/educational-game', async (req, res) => {
  try {
    const { subject, grade, topic, gameType } = req.body;
    const ai = getGeminiClient();

    const prompt = `Hãy thiết kế kịch bản TRÒ CHƠI GIÁO DỤC (EDU GAME) hấp dẫn cho lớp học THCS:
- Môn: ${subject || 'Tiếng Anh'} - Lớp: ${grade || '9'}
- Chủ đề: ${topic || 'Vocabulary Unit 1: Local Environment'}
- Thể loại trò chơi: ${gameType || 'Kahoot Quiz Show / Vòng quay may mắn'}

Bao gồm:
1. Tên trò chơi & Luật chơi ngắn gọn
2. Chuẩn bị đạo cụ / công nghệ
3. Bộ 8-10 câu hỏi tương tác kèm đáp án, câu hỏi bẫy hài hước
4. Thang điểm thi đua và phần thưởng khích lệ.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
    });

    return res.json({ result: response.text || '' });
  } catch (error: any) {
    console.error('Error in /api/ai/educational-game:', error);
    return res.status(500).json({ error: error.message || 'Lỗi tạo trò chơi.' });
  }
});

// 7. AI Student Comment & Feedback Generator
app.post('/api/ai/student-feedback', async (req, res) => {
  try {
    const { studentName, subject, gpa, behaviorNote } = req.body;
    const ai = getGeminiClient();

    const prompt = `Soạn lời NHẬN XÉT ĐÁNH GIÁ HỌC SINH THCS chuẩn Thông tư 22/2021/TT-BGDĐT:
- Học sinh: ${studentName || 'Nguyễn Văn An'}
- Môn học: ${subject || 'Toán học'}
- Điểm trung bình: ${gpa || 9.5}
- Đặc điểm/Hành vi nổi bật: ${behaviorNote || 'Hăng hái phát biểu, tích cực hỗ trợ bạn bè cùng tiến bộ, cẩn thận.'}

Yêu cầu: Tạo 3 tùy chọn lời nhận xét (1. Ngắn gọn dùng cho sổ điểm điện tử; 2. Chi tiết ghi vào Học bạ; 3. Lời nhắn riêng gửi Phụ huynh). Vừa khen ngợi chân thành vừa định hướng động viên em phát huy hơn nữa.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
    });

    return res.json({ result: response.text || '' });
  } catch (error: any) {
    console.error('Error in /api/ai/student-feedback:', error);
    return res.status(500).json({ error: error.message || 'Lỗi tạo nhận xét học sinh.' });
  }
});

// 8. Custom Prompt Runner
app.post('/api/ai/custom-prompt', async (req, res) => {
  try {
    const { prompt } = req.body;
    const ai = getGeminiClient();

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt || 'Xin chào',
    });

    return res.json({ result: response.text || '' });
  } catch (error: any) {
    console.error('Error in /api/ai/custom-prompt:', error);
    return res.status(500).json({ error: error.message || 'Lỗi xử lý prompt.' });
  }
});

// ----------------------------------------------------
// VITE MIDDLEWARE & STATIC SERVING
// ----------------------------------------------------
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server THCS Digital Ecosystem running on http://localhost:${PORT}`);
  });
}

startServer();
