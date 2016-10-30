package br.ufrj.cos482.web.rest;

import br.ufrj.cos482.Cos482App;

import br.ufrj.cos482.domain.Aluno;
import br.ufrj.cos482.repository.AlunoRepository;
import br.ufrj.cos482.service.AlunoService;
import br.ufrj.cos482.service.dto.AlunoDTO;
import br.ufrj.cos482.service.mapper.AlunoMapper;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import static org.hamcrest.Matchers.hasItem;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import br.ufrj.cos482.domain.enumeration.StatusMatricula;
/**
 * Test class for the AlunoResource REST controller.
 *
 * @see AlunoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = Cos482App.class)
public class AlunoResourceIntTest {

    private static final String DEFAULT_DRE = "AAAAA";
    private static final String UPDATED_DRE = "BBBBB";

    private static final StatusMatricula DEFAULT_MATRICULA = StatusMatricula.ATIVA;
    private static final StatusMatricula UPDATED_MATRICULA = StatusMatricula.INATIVA;

    @Inject
    private AlunoRepository alunoRepository;

    @Inject
    private AlunoMapper alunoMapper;

    @Inject
    private AlunoService alunoService;

    @Inject
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Inject
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Inject
    private EntityManager em;

    private MockMvc restAlunoMockMvc;

    private Aluno aluno;

    @PostConstruct
    public void setup() {
        MockitoAnnotations.initMocks(this);
        AlunoResource alunoResource = new AlunoResource();
        ReflectionTestUtils.setField(alunoResource, "alunoService", alunoService);
        this.restAlunoMockMvc = MockMvcBuilders.standaloneSetup(alunoResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Aluno createEntity(EntityManager em) {
        Aluno aluno = new Aluno()
                .dre(DEFAULT_DRE)
                .matricula(DEFAULT_MATRICULA);
        return aluno;
    }

    @Before
    public void initTest() {
        aluno = createEntity(em);
    }

    @Test
    @Transactional
    public void createAluno() throws Exception {
        int databaseSizeBeforeCreate = alunoRepository.findAll().size();

        // Create the Aluno
        AlunoDTO alunoDTO = alunoMapper.alunoToAlunoDTO(aluno);

        restAlunoMockMvc.perform(post("/api/alunos")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(alunoDTO)))
                .andExpect(status().isCreated());

        // Validate the Aluno in the database
        List<Aluno> alunos = alunoRepository.findAll();
        assertThat(alunos).hasSize(databaseSizeBeforeCreate + 1);
        Aluno testAluno = alunos.get(alunos.size() - 1);
        assertThat(testAluno.getDre()).isEqualTo(DEFAULT_DRE);
        assertThat(testAluno.getMatricula()).isEqualTo(DEFAULT_MATRICULA);
    }

    @Test
    @Transactional
    public void getAllAlunos() throws Exception {
        // Initialize the database
        alunoRepository.saveAndFlush(aluno);

        // Get all the alunos
        restAlunoMockMvc.perform(get("/api/alunos?sort=id,desc"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
                .andExpect(jsonPath("$.[*].id").value(hasItem(aluno.getId().intValue())))
                .andExpect(jsonPath("$.[*].dre").value(hasItem(DEFAULT_DRE.toString())))
                .andExpect(jsonPath("$.[*].matricula").value(hasItem(DEFAULT_MATRICULA.toString())));
    }

    @Test
    @Transactional
    public void getAluno() throws Exception {
        // Initialize the database
        alunoRepository.saveAndFlush(aluno);

        // Get the aluno
        restAlunoMockMvc.perform(get("/api/alunos/{id}", aluno.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(aluno.getId().intValue()))
            .andExpect(jsonPath("$.dre").value(DEFAULT_DRE.toString()))
            .andExpect(jsonPath("$.matricula").value(DEFAULT_MATRICULA.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingAluno() throws Exception {
        // Get the aluno
        restAlunoMockMvc.perform(get("/api/alunos/{id}", Long.MAX_VALUE))
                .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAluno() throws Exception {
        // Initialize the database
        alunoRepository.saveAndFlush(aluno);
        int databaseSizeBeforeUpdate = alunoRepository.findAll().size();

        // Update the aluno
        Aluno updatedAluno = alunoRepository.findOne(aluno.getId());
        updatedAluno
                .dre(UPDATED_DRE)
                .matricula(UPDATED_MATRICULA);
        AlunoDTO alunoDTO = alunoMapper.alunoToAlunoDTO(updatedAluno);

        restAlunoMockMvc.perform(put("/api/alunos")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(alunoDTO)))
                .andExpect(status().isOk());

        // Validate the Aluno in the database
        List<Aluno> alunos = alunoRepository.findAll();
        assertThat(alunos).hasSize(databaseSizeBeforeUpdate);
        Aluno testAluno = alunos.get(alunos.size() - 1);
        assertThat(testAluno.getDre()).isEqualTo(UPDATED_DRE);
        assertThat(testAluno.getMatricula()).isEqualTo(UPDATED_MATRICULA);
    }

    @Test
    @Transactional
    public void deleteAluno() throws Exception {
        // Initialize the database
        alunoRepository.saveAndFlush(aluno);
        int databaseSizeBeforeDelete = alunoRepository.findAll().size();

        // Get the aluno
        restAlunoMockMvc.perform(delete("/api/alunos/{id}", aluno.getId())
                .accept(TestUtil.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk());

        // Validate the database is empty
        List<Aluno> alunos = alunoRepository.findAll();
        assertThat(alunos).hasSize(databaseSizeBeforeDelete - 1);
    }
}
