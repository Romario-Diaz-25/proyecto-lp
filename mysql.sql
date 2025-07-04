
CREATE TABLE Exams (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  maxScore INT NOT NULL,
  minimumScoreToApprove INT NOT NULL,
  icon VARCHAR(255),
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


CREATE TABLE ExamQuestions (
  id INT NOT NULL AUTO_INCREMENT,
  questionText TEXT NOT NULL,
  answerOptions JSON NOT NULL,
  correctAnswerIndex INT NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


INSERT INTO ProyectoDB.Exams (id, title, description, icon)
VALUES
  (1, 'Matemáticas', 'Álgebra, geometría y cálculo básico', '📐'),
  (2, 'Historia',   'Historia universal y nacional',        '📚'),
  (3, 'Ciencias',   'Biología, química y física',           '🔬'),
  (4, 'Literatura', 'Análisis literario y comprensión lectora','📖');
 
 
 CREATE TABLE ExamQuestions (
  id INT NOT NULL AUTO_INCREMENT,
  questionText TEXT NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE ExamAnswers (
  id INT NOT NULL AUTO_INCREMENT,
  response VARCHAR(255) NOT NULL,
  isCorrect BOOLEAN NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



 INSERT INTO ExamQuestions (id, questionText, examId) VALUES
  -- Matemáticas (examId = 1)
  (1,  '¿Cuál es el resultado de 2 + 2 × 3?',                   1),
  (2,  '¿Cuál es la fórmula del área de un círculo?',           1),
  (3,  '¿Cuánto es √16?',                                       1),
  (4,  '¿Cuál es el valor de x en la ecuación 2x + 4 = 10?',     1),
  (5,  '¿Cuántos grados tiene un triángulo?',                   1),
  -- Historia (examId = 2)
  (6,  '¿En qué año comenzó la Segunda Guerra Mundial?',        2),
  (7,  '¿Quién fue el primer presidente de Estados Unidos?',    2),
  (8,  '¿En qué siglo ocurrió la Revolución Francesa?',         2),
  (9,  '¿Cuál fue la capital del Imperio Romano?',              2),
  (10, '¿En qué año cayó el Muro de Berlín?',                   2),
  -- Ciencias (examId = 3)
  (11, '¿Cuál es el símbolo químico del oro?',                 3),
  (12, '¿Cuántos huesos tiene el cuerpo humano adulto?',       3),
  (13, '¿Cuál es la velocidad de la luz?',                     3),
  (14, '¿Qué gas es más abundante en la atmósfera?',           3),
  (15, '¿Cuál es la unidad básica de la vida?',                3),
  -- Literatura (examId = 4)
  (16, '¿Quién escribió "Don Quijote de la Mancha"?',           4),
  (17, '¿Cuál es la obra más famosa de William Shakespeare?',   4),
  (18, '¿Qué es una metáfora?',                                 4),
  (19, '¿Quién escribió "Cien años de soledad"?',               4),
  (20, '¿Qué es un soneto?',                                    4)
;

INSERT INTO ExamAnswers (response, isCorrect, examQuestionId) VALUES
  -- Para questionId = 1
  ('8',    TRUE,  1),
  ('12',   FALSE, 1),
  ('10',   FALSE, 1),
  ('6',    FALSE, 1),

  -- questionId = 2
  ('πr²',  TRUE,  2),
  ('2πr',  FALSE, 2),
  ('πd',   FALSE, 2),
  ('r²',   FALSE, 2),

  -- questionId = 3
  ('2',    FALSE, 3),
  ('4',    TRUE,  3),
  ('8',    FALSE, 3),
  ('16',   FALSE, 3),

  -- questionId = 4
  ('2',    FALSE, 4),
  ('3',    TRUE,  4),
  ('4',    FALSE, 4),
  ('5',    FALSE, 4),

  -- questionId = 5
  ('90°',  FALSE, 5),
  ('180°', TRUE,  5),
  ('270°', FALSE, 5),
  ('360°', FALSE, 5),

  -- questionId = 6
  ('1938', FALSE, 6),
  ('1939', TRUE,  6),
  ('1940', FALSE, 6),
  ('1941', FALSE, 6),

  -- questionId = 7
  ('Thomas Jefferson',   FALSE, 7),
  ('John Adams',         FALSE, 7),
  ('George Washington',  TRUE,  7),
  ('Benjamin Franklin',  FALSE, 7),

  -- questionId = 8
  ('Siglo XVII',  FALSE, 8),
  ('Siglo XVIII', TRUE,  8),
  ('Siglo XIX',   FALSE, 8),
  ('Siglo XX',    FALSE, 8),

  -- questionId = 9
  ('Atenas',        FALSE, 9),
  ('Roma',          TRUE,  9),
  ('Constantinopla',FALSE, 9),
  ('Alejandría',    FALSE, 9),

  -- questionId = 10
  ('1987', FALSE, 10),
  ('1988', FALSE, 10),
  ('1989', TRUE,  10),
  ('1990', FALSE, 10),

  -- questionId = 11
  ('Go', TRUE,  11),
  ('Au', FALSE, 11),
  ('Ag', FALSE, 11),
  ('Or', FALSE, 11),

  -- questionId = 12
  ('196', FALSE, 12),
  ('206', TRUE,  12),
  ('216', FALSE, 12),
  ('226', FALSE, 12),

  -- questionId = 13
  ('300,000 km/s', TRUE, 13),
  ('150,000 km/s', FALSE,13),
  ('450,000 km/s', FALSE,13),
  ('600,000 km/s', FALSE,13),

  -- questionId = 14
  ('Oxígeno',      FALSE,14),
  ('Nitrógeno',    TRUE, 14),
  ('Dióxido de carbono', FALSE,14),
  ('Argón',        FALSE,14),

  -- questionId = 15
  ('Átomo',   FALSE,15),
  ('Molécula',FALSE,15),
  ('Célula',  TRUE, 15),
  ('Tejido',  FALSE,15),

  -- questionId = 16
  ('Lope de Vega',         FALSE,16),
  ('Miguel de Cervantes',  TRUE, 16),
  ('Francisco de Quevedo', FALSE,16),
  ('Calderón de la Barca', FALSE,16),

  -- questionId = 17
  ('Macbeth',         FALSE,17),
  ('Hamlet',          TRUE, 17),
  ('Romeo y Julieta', FALSE,17),
  ('Otelo',           FALSE,17),

  -- questionId = 18
  ('Una comparación directa',                       FALSE,18),
  ('Una figura retórica de comparación implícita',  TRUE, 18),
  ('Una repetición de sonidos',                     FALSE,18),
  ('Una exageración',                               FALSE,18),

  -- questionId = 19
  ('Mario Vargas Llosa',       FALSE,19),
  ('Gabriel García Márquez',   TRUE, 19),
  ('Jorge Luis Borges',        FALSE,19),
  ('Octavio Paz',              FALSE,19),

  -- questionId = 20
  ('Un poema de 12 versos', FALSE,20),
  ('Un poema de 14 versos', TRUE, 20),
  ('Un poema de 16 versos', FALSE,20),
  ('Un poema de 18 versos', FALSE,20)
;




CREATE TABLE ProyectoDB.`Students` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `firstName` VARCHAR(255) NOT NULL,
  `lastName` VARCHAR(255) NOT NULL,
  `age` INT,
  `lifes` INT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO ProyectoDB.`Students` (`firstName`, `lastName`, `age`, `lifes`) VALUES
  ('Ana',    'Martínez',   20, 3),
  ('Carlos', 'López',     22, 4),
  ('Elena',  'García',    19, 5);
