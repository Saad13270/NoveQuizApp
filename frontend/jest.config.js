export default {
	testEnvironment: 'jsdom',
	transform: {
		'^.+\\.(js|jsx)$': ['babel-jest', { presets: ['@babel/preset-env', '@babel/preset-react'] }],
	},
	moduleFileExtensions: ['js', 'jsx'],
};
  