const { DataTypes, Model } = require('sequelize');

/**
 * Defines the Quiz model.
 *
 * Fields:
 * - id: Auto-increment primary key
 * - question: Question text
 * - options: Stored as TEXT (stringified JSON array of 4 options)
 * - answerIndex: Integer index (0-3)
 * - category: Category string
 * - difficulty: Difficulty string
 * - createdAt / updatedAt: Managed by Sequelize
 */
function defineQuizModel(sequelize) {
	class Quiz extends Model {}

	Quiz.init(
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			question: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
			options: {
				type: DataTypes.TEXT,
				allowNull: false,
				get() {
					const raw = this.getDataValue('options');
					try {
						return raw ? JSON.parse(raw) : [];
					} catch (err) {
						return [];
					}
				},
				set(val) {
					this.setDataValue('options', JSON.stringify(val));
				},
			},
			answerIndex: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					min: 0,
					max: 3,
				},
			},
			category: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			difficulty: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: 'Quiz',
			tableName: 'quizzes',
			timestamps: true,
		}
	);

	return Quiz;
}

module.exports = defineQuizModel;

// Placeholder
